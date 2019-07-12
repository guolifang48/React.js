import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';

import Drawer from '@material-ui/core/Drawer';
import NotificationCenterStyles from '../../styles/NotificationCenter';
import MessageIcon from '@material-ui/icons/Email'; 
import Avatar from '@material-ui/core/Avatar';

import indigo from '@material-ui/core/colors/indigo';
import mockData from '../../utils/mock/admin_mock';
import { connect } from 'react-redux';
import { get_all_unread_chat_history } from '../../apis/seller';

class ChatCenter extends Component {

    state = {
        tab: 0,
        data: []
    };

    mounted = true;

    handleTabToggle = (event, tab) => {
        this.setState({ tab });
    };

    handleChatItem = (el, sender_id) => {
        var receiver_id = this.props.userinfo.userid;
        this.props.toogleChats();
        this.props.setChatRead(sender_id, receiver_id);
    }

    componentWillMount() {
        
    }

    async componentDidMount() {
        
        var postinfo = {
            user_id: this.props.userinfo.userid
        }
        get_all_unread_chat_history(postinfo, (response) => {
            if (response != undefined) {
                this.setState({data: response.data});
            }
        });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        const { classes, chatsOpen, toogleChats } = this.props;
        const { tab, stocks, forecast } = this.state;
        const today = Date.now();
        return (
            <Drawer
                variant="temporary"
                anchor="right"
                open={chatsOpen}
                ModalProps={{
                    keepMounted: false,
                    className: classes.modal,
                    BackdropProps: {
                    className: classes.backdrop,
                    },
                    onBackdropClick: toogleChats
                }}
                classes={{
                    paper: classes.drawerPaper,
                }}
                >
                <div className={classes.container}>
                    <NavLink to={`/chat`} onClick={(el) => this.handleChatItem(el)}>
                        <div className={classes.seeAllWrapper}>
                            <span>See All</span>
                        </div>
                    </NavLink>
                    <List>
                        { this.props.chatInfo.aryUnreadChatting.map((chat, index) => (
                            <NavLink to={`/chat/${chat.sender.id}`} onClick={(el, sender_id) => this.handleChatItem(el, chat.sender.id)} key={index}>
                                <ListItem button key={index}>
                                    <Avatar style={{color: indigo[500], backgroundColor: 'transparent'}}><MessageIcon /></Avatar>
                                    <ListItemText primary={chat.sender.username} secondary={chat.message} />
                                </ListItem>
                            </NavLink>
                        ))}
                    </List>
                </div>
            </Drawer>
        );
        }
    }

ChatCenter.propTypes = {
    classes: PropTypes.object.isRequired,
    chatsOpen: PropTypes.bool,
    toogleChats: PropTypes.func,
    setChatRead: PropTypes.func
}
const mapStateToProps = state => {
    return  {
        userinfo: state.auth.userinfo,
        chatInfo: state.chat.chatInfo
    };
}
export default connect(mapStateToProps, null)(withStyles(NotificationCenterStyles)(ChatCenter));
// export default withStyles(NotificationCenterStyles)(ChatCenter);