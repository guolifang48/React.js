import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SendIcon from '@material-ui/icons/Send';
import { Wrapper } from '../../../components';
import ChatStyles from '../../../styles/Chat';
import * as chatActions from '../../../actions/chatActions';
import * as chatTypes from '../../../constants/chatActionTypes';
import { get_chatting_users, get_chat_history_by_user, add_chat, set_chat_read, get_unread_chat_count_by_user } from '../../../apis/seller';

import openSocket from 'socket.io-client';
const  socket = openSocket('http://192.168.1.15:60000');
var parent = {};
class Chat extends Component {
	state = {
		opened: false,
		users: [],
		chats: [],
		selectedUser: {},
		selectedUserClass: [],
		strMessage: '',
    user: {
      byIds: [

      ],
      ownId: [
      
      ]
    },
    chat_contact_id: this.props.match.params.id != undefined ? this.props.match.params.id : 0,
    sockets: {}
	}

	handleDrawerToggle = () => {
		this.setState({ opened: !this.state.opened });
	}

	handleSelectUser = (el, idx) => {
    this.state.selectedUser = this.state.users[idx];
		var aryCls = this.state.selectedUserClass;
		for(let i = 0; i < aryCls.length; i++) {
			aryCls[i] = '';
		}
		aryCls[idx] = 'selectedUser';
		this.setState({selectedUserClass: aryCls});
    this.getChatHistory(this.state.selectedUser.id);
    this.setChatRead(this.state.selectedUser.id, this.props.userinfo.userid);
    this.getUnreadChattingCountByUser(this.state.selectedUser.id, this.props.userinfo.userid);
    setTimeout(function() {
      parent.scrollToBottom();
    }, 100);    
	}
  
	handleMessageText = event => {
		this.setState({strMessage: event.target.value});
	}

  handleKeyPress = (e) => {
    if (e.key === 'Enter') 
    {
      this.sendMessage();
      this.scrollToBottom();
    }
  }

	sendMessage = (el) => {
    var m_Arr = [] = this.state.chats;
		if(this.state.strMessage != '') {
			var messageInfo = {
				"sender": this.props.userinfo,
				"receiver": this.state.selectedUser,
				"message": this.state.strMessage,
				"type": "sent",
				"created": Date.now(),
        "is_read": false,
        "socket_id": this.state.sockets[this.state.selectedUser.id]
			}
			m_Arr.push(messageInfo);
			this.setState({chats: m_Arr, strMessage: ''});

     /* 
      * Api
      * Call node socket server for sending message.
      */ 
      if(typeof(messageInfo['socket_id']) != 'undefined') {
        socket.emit(chatTypes.SEND_MESSAGE, messageInfo);
      }
      this.addChat();
		}
	}

  scrollToBottom = () => {
    if(this.messagesEnd){
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
  }

	componentWillMount() {
    parent = this;
    setTimeout(function() {parent.scrollToBottom();}, 100);
  }

  componentDidMount() {
    this.getChatUsers();
    /*
     * Api
     * Call node socket server for receiving response.
     */
   var messageInfo = {
      "user_id": this.props.userinfo.userid
    }
    socket.emit(chatTypes.CHAT_STARTED, messageInfo);

    socket.on(chatTypes.NEW_MESSAGE, response => {
      var m_Arr = [] = this.state.chats;
      m_Arr.push(response);
      this.setState({chats: m_Arr});
    });

    socket.on(chatTypes.OWN_DATA_RECEIVED, response => {
      this.setState({sockets: response});
    });
  }

  componentDidUpdate() {
    var param_id = this.props.match.params.id != undefined ? this.props.match.params.id : 0
    if(this.state.chat_contact_id != param_id) {
      this.state.chat_contact_id = param_id;
      this.getChatUsers();
    }
    setTimeout(function() {parent.scrollToBottom();}, 100);
  }

 /*
  * Api
  * Get users who can chat with me, in here the last chatting user be in the top of list.
  */
  getChatUsers = () => {
    var postInfo = {
      user_id: this.props.userinfo.userid
    }
    get_chatting_users(postInfo, (response) => {
      if(this.state.chat_contact_id == 0) { // If select 'see all' on chat notification.
        var aryCls = [];
        aryCls[0] = 'selectedUser';
        this.setState({
          users: response.data,
          selectedUserClass: aryCls,
          selectedUser: response.data[0]
        })
        this.getChatHistory(this.state.selectedUser.id);
        this.setChatRead(this.state.selectedUser.id, this.props.userinfo.userid);
        this.getUnreadChattingCountByUser(this.state.selectedUser.id, this.props.userinfo.userid);
      } else { // If select chat individual.
        var aryCls = [];
        var aryUser = response.data;
        var idx = 0;
        for (var i = 0; i < aryUser.length; i++) {
          aryCls.push('');
          if(aryUser[i].id == this.state.chat_contact_id) {
            aryCls[i] = 'selectedUser';
            idx = i;
          }
        }
        this.setState({
          users: aryUser,
          selectedUserClass: aryCls,
          selectedUser: aryUser[idx]
        })
        this.getChatHistory(this.state.chat_contact_id);
      }
    })
  }
  /*
   * Api
   * Get chat user's history by date order
   */
  getChatHistory = (chatting_user_id) => {
    var postInfo = {
      user_id: this.props.userinfo.userid,
      chatting_user_id: chatting_user_id
    }
    get_chat_history_by_user(postInfo, (response) => {      
      this.setState({
        chats: response.data
      })
    })
  }

  /*
   * Api
   * Add chat
   */
  addChat = () => {
    var postInfo = {
      "sender": this.props.userinfo.userid,
      "receiver": this.state.selectedUser.id,
      "message": this.state.strMessage,
      "type": "sent",
      "created": Date.now(),
      "is_read": false
    }
    add_chat(postInfo, (response) => {
      if(response.data == 'success') {
        this.getChatHistory(this.props.userinfo.userid);
      }
    });
  }

  /*
   * Api
   * Set chatting message to read status
   */
  setChatRead = (sender_id, receiver_id) => {
    var postInfo = {
      sender_id: sender_id,
      receiver_id: receiver_id
    }
    set_chat_read(postInfo, (response) => {
      var chatInfo = {
        cntUnreadChatting: response.data.length,
        aryUnreadChatting: response.data
      }
      this.props.handleChatNotification(chatInfo);
    })
  }

  /*
   * Api
   * Get unread chatting message count by user
   */
   getUnreadChattingCountByUser = (sender_id, receiver_id) => {
      var postInfo = {
        sender_id: sender_id,
        receiver_id: receiver_id
      }
      get_unread_chat_count_by_user(postInfo, (response) => {
        var aryTmp = this.state.users;
        for (var i = 0; i < aryTmp.length; i++) {
          if(aryTmp[i]['id'] == sender_id) {
            aryTmp[i]['cntUnread'] = response.data;
          }
        }
        this.setState({users: aryTmp});
      });
   }

  render() {
    const { classes } = this.props;
    const { opened } = this.state;
    const menu = (
      <List subheader={<ListSubheader disableSticky>Contacts</ListSubheader>}>
        { this.state.users.map((user, index) => (            
          <ListItem key={index} button onClick={(el) => {this.handleSelectUser(el, index)}} className={this.state.selectedUserClass[index]}>
            <div className="avatar_wrapper">
              <Avatar alt="" src={`/static/images/face${user.id}.jpg`} />
              {(typeof(this.state.sockets[user.id]) == 'undefined'
                ?
                  <div className="offline_status"></div>
                :
                  <div className="online_status"></div>
              )}
            </div>
            <ListItemText primary={user.username} secondary={typeof(this.state.sockets[user.id]) == 'undefined' ? 'Offline' : 'Online'} />
            {(user.cntUnread != 0
              ?
                <div className="unread_message">
                  <p className="unread_message_font">{user.cntUnread}</p>
                </div>  
              :
                undefined
            )}
            
          </ListItem>
        ))}
      </List>
    );
    return (
      <Wrapper padding={true}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Card>
              <div className={classes.root}>
                <AppBar position="absolute" className={classes.appBar} color="default">
                  <Toolbar className={classes.toolBar}>
                    <Hidden mdUp>
                      <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => this.handleDrawerToggle()}>
                        <MenuIcon />
                      </IconButton>
                    </Hidden>
                    <div className={classes.headerLeft}>
                      <Avatar alt="" src={`/static/images/face${this.props.userinfo.userid}.jpg`} />
                    </div>
                    <List dense>
                      <ListItem>
                        {
                            this.state.selectedUser.id != undefined
                            ?
                                <Avatar alt="" src={`/static/images/face${this.state.selectedUser.id}.jpg`} />                                
                            :
                            undefined
                        }
                        <ListItemText primary={this.state.selectedUser.username} secondary={typeof(this.state.sockets[this.state.selectedUser.id]) == 'undefined' ? 'Offline' : 'Online'} />
                      </ListItem>
                    </List>
                    <span className="flexSpacer" />
                    <IconButton
                      color="inherit"
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Toolbar>
                </AppBar>
                <div className={classes.wrapper}>
                  <Hidden smDown>
                    <Drawer
                      variant="permanent"
                      ModalProps={{
                        keepMounted: false,
                        className: classes.modal,
                        BackdropProps: {
                          className: classes.backdrop,
                        },
                        onBackdropClick: this.handleDrawerToggle
                      }}
                      classes={{
                        paper: classes.drawerPaper,
                      }}
                    >
                      {menu}
                    </Drawer>
                  </Hidden>
                  <Hidden mdUp>
                    <Drawer
                      variant="temporary"
                      open={opened}
                      ModalProps={{
                        keepMounted: false,
                        className: classes.modal,
                        BackdropProps: {
                          className: classes.backdrop,
                        },
                        onBackdropClick: this.handleDrawerToggle
                      }}
                      classes={{
                        paper: classes.drawerPaper,
                      }}
                    >
                      {menu}
                    </Drawer>
                  </Hidden>
                  <main className={classes.main}>
                    <div className={classes.content} id="box">
                      { this.state.chats.map((chat, index) => (
                        <div key={index} className={classNames(classes.conversation, chat.type === 'sent' ? classes.conversationSent : classes.conversationReceived)}>
                          <div className={classNames(classes.body, chat.type === 'sent' ? classes.bodySent : classes.bodyReceived)}>
                            <Typography color="inherit">{chat.message}</Typography>
                            <Typography variant="caption" className={
                                classNames(classes.date, chat.type === 'sent' ? classes.dateSent : classes.dateReceived)
                              }>{distanceInWordsToNow(chat.created)} ago</Typography>
                          </div>
                        </div>
                      ))}
                      <div style={{ float:"left", clear: "both", marginTop:'100px'}}
                          ref={(el) => { this.messagesEnd = el; }}>
                      </div>
                    </div>
                    <Divider />
                    <div className="px-2">
                      <Grid container spacing={0} justify={'center'} alignItems={'center'}>
                        <TextField
                          label="Write a message"
                          type="text"
                          margin="normal"
                          className={classes.input}
                          value = {this.state.strMessage}
                          onChange = {this.handleMessageText}
                          onKeyPress = {this.handleKeyPress}
                        />
                        <Button variant="fab" color="primary" aria-label="send" className={classes.button} onClick={(el) => this.sendMessage(el)}>
                          <SendIcon />
                        </Button>
                      </Grid>
                    </div>
                  </main>
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Wrapper>
    );
  }
}

Chat.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return  {
    userinfo: state.auth.userinfo,
    chatInfo: state.chat.chatInfo
  };
}
const mapDispatchToProps = dispatch => {
  return {
    handleChatNotification:(chatInfo)=>{
      dispatch(chatActions.reset_chat_notification(chatInfo))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(ChatStyles)(Chat));