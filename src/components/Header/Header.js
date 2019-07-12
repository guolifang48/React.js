import React, { Component } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Hidden from '@material-ui/core/Hidden';
import Collapse from '@material-ui/core/Collapse';
import SearchIcon from '@material-ui/icons/Search';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import MessageIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import HeaderStyles from '../../styles/Header';

import { connect } from 'react-redux';
import * as authActions from '../../actions/authActions';
import * as chatActions from '../../actions/chatActions';
import { get_unread_notification_count, get_unread_chat_count, get_all_unread_chat_history } from '../../apis/seller';
import {user_logout} from '../../apis/index';

//made by somi

import Button from '@material-ui/core/Button';
//

class Header extends Component {

  constructor(props) {
    super(props);
    this.userSignOut = this.userSignOut.bind(this);
  }

  state = {
    anchorEl: null,
    searchExpanded: false,
    isOpened: false,
    unread_count: 0,
    cntUnreadChatting: 0,
    dialogOpen: false,
    new_password: '',
    c_password: '',
    password: ''
  };

  getUnreadNotificationCount = () => {
    var id = this.props.userinfo.userid;
    get_unread_notification_count({user_id:id}, (response) => {
      if (typeof(response.data) != 'undefined') {
        this.setState({unread_count: response.data.unread_count});
      }
    });
  }
  componentWillMount() {
    this.getUnreadChatCount();
    this.getUnreadNotificationCount();
  }

  getUnreadChatCount = () => {
    var postinfo = {
      user_id: this.props.userinfo.userid
    }
    // get_unread_chat_count(postinfo, (response) => {
    //   this.setState({cntUnreadChatting: response.data});
    // });
  }

  handleSettingdToogle = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseMenu = () => {
    this.setState({ anchorEl: null });
  };
  handleProfileMenu = () => {
    this.setState({ anchorEl: null });
    this.setState({isOpened : true});
  };
  handleDialogClose  = () => {
    this.setState({isOpened : false});
  }
  handleSearchExpandToogle = () => {
    this.setState({ searchExpanded: !this.state.searchExpanded });
  };

  handleDrawerToogle = () => {
    this.props.toogleDrawer();
    if (this.state.searchExpanded) this.handleSearchExpandToogle();
  }

  handleNotificationToogle = () => {
    this.props.toogleNotifications();
    if (this.state.searchExpanded) this.handleSearchExpandToogle();
  }

  handleChatToogle = () => {
    this.props.toogleChat();
    if(this.state.searchExpanded) this.handleChatToogle();
  }

  userSignOut = () => {
    /*
     * Below code is only logout code which isn't linked api.
     * It just shows only logout feature.
     */

    const userinfo = {
      ...this.props.userinfo,
      isLogin:false
    }
    this.props.handleChangeAuthInfo(userinfo);

    /*
     * Below code is logout code which is linked with api.
     * So If you have logout api on your django backend, below code will run successfully.
     */
    /*user_logout(this.props.userinfo, (response) => {
      if (typeof(response.data) != 'undefined') {
        if (response.data.success == true) {
          const userinfo = {
            ...this.props.userinfo,
            isLogin:false
          }
          this.props.handleChangeAuthInfo(userinfo);
        }
      }
    });*/
  }

  openPasswordDialog = () => {
    this.setState({dialogOpen: true});
  }

  handleClose = () => {  
    this.setState({ dialogOpen: false });
  };

  handleChangeCurrentPassword = (e) => {
    this.setState({password: e.target.value});
  }

  handleChangeConfirmPassword = (e) => {
    this.setState({c_password: e.target.value});
  }

  handleChangeNewPassword = (e) => {
    this.setState({new_password: e.target.value});
  }

  changePassword = (e) => {
    if (this.state.password == '' || this.state.new_password == "" || this.state.c_password == "") {
      return;
    }
    else {
      e.preventDefault();
      if (this.state.new_password != this.state.c_password) {
        return;
      }
      else {
        let temp = {
          id: this.props.userinfo.id,
          current_password: this.state.password,
          new_password: this.state.new_password
        }

        // api change_user_password

        this.setState({dialogOpen: false});
      }
    }
  }

  render() {
    const { classes, logo, logoAltText, toogleFullscreen } = this.props;
    const { anchorEl, searchExpanded,unread_count } = this.state;
    return (
      <div>
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          >
          <form>
            <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
            <DialogContent>
              <FormGroup className={classes.formGroup}>
                <FormControl className={classes.formControl} fullWidth>
                <TextField
                  autoFocus
                  margin="dense"
                  id="current_password"
                  label="Current Password"
                  fullWidth
                  value={this.state.password}
                  onChange={this.handleChangeCurrentPassword}
                  required={true}
                />
                </FormControl>
              </FormGroup>
              <FormGroup className={classes.formGroup}>
                <FormControl className={classes.formControl}>
                <TextField
                  margin="dense"
                  id="new_password"
                  label="New Password"
                  fullWidth
                  value={this.state.new_password}
                  onChange={this.handleChangeNewPassword}
                  required={true}
                />
                </FormControl>
              </FormGroup>
              <FormGroup className={classes.formGroup}>
                <FormControl className={classes.formControl}>
                <TextField
                  margin="dense"
                  id="confirm_password"
                  label="Confirm Password"
                  fullWidth
                  value={this.state.c_password}
                  onChange={this.handleChangeConfirmPassword}
                  required={true}
                  error={this.state.new_password!=this.state.c_password}
                />
                </FormControl>
              </FormGroup>  
            </DialogContent>
            <DialogActions>
              <Button variant="raised" onClick={this.handleClose} color="secondary">
                Cancel
              </Button>
              <Button variant="raised" type="submit" onClick={(el) => { this.changePassword(el) }} color="primary">
                Change
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        <AppBar
        position="static"
        className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleDrawerToogle}
          >
            <MenuIcon />
          </IconButton>

          <div className={classes.branding}>
            <img src={logo} alt={logoAltText} className={classes.logo} />
          </div>

          <span className="flexSpacer" />

          
          {(this.props.userinfo.role != 'ADMIN'
            ? <IconButton color="inherit" onClick={this.handleChatToogle}>
              <Badge badgeContent = {this.props.chatInfo.cntUnreadChatting} color="secondary">
                <MessageIcon />
              </Badge>
            </IconButton>
            :
              undefined
          )}
          {(this.props.userinfo.role != 'ADMIN'
            ? <IconButton color="inherit" onClick={this.handleNotificationToogle}>
                <Badge badgeContent={unread_count} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            : undefined
          )}
          <IconButton
            aria-label="User Settings"
            aria-owns={anchorEl ? 'user-menu' : null}
            aria-haspopup="true"
            color="inherit"
            onClick={this.handleSettingdToogle}
          >
            <MoreVertIcon />
          </IconButton>
          {(this.props.userinfo.role == 'ADMIN'
            ? <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleCloseMenu}
              >
                <NavLink to={`/user/${this.props.userinfo.userid}`}>
                  <MenuItem onClick={this.handleCloseMenu}>
                      <ListItemIcon>
                        <AccountBoxIcon />
                      </ListItemIcon>
                      <ListItemText inset primary="Profile" />
                  </MenuItem>
                </NavLink>
                <MenuItem onClick={this.handleCloseMenu}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Change Password" onClick={this.openPasswordDialog} />
                </MenuItem>
                <NavLink to="/signin" onClick={this.userSignOut}>
                  <MenuItem>
                    <ListItemIcon>
                      <ExitToAppIcon />
                    </ListItemIcon>
                      <ListItemText inset primary="Sign out"/>
                  </MenuItem>
                </NavLink>  
              </Menu>
            : <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleCloseMenu}
              >
                <MenuItem onClick={this.handleCloseMenu}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Change Password" onClick={this.openPasswordDialog} />
                </MenuItem>
                <NavLink to="/Profile">
                  <MenuItem onClick={this.handleCloseMenu}>
                      <ListItemIcon>
                        <AccountBoxIcon />
                      </ListItemIcon>
                      <ListItemText inset primary="Profile" />
                  </MenuItem>
                </NavLink>
                <NavLink to="/signin" onClick={this.userSignOut}>
                  <MenuItem onClick={this.handleCloseMenu}>
                    <ListItemIcon>
                      <ExitToAppIcon />
                    </ListItemIcon>
                      <ListItemText inset primary="Sign out" />
                  </MenuItem>
                </NavLink>
              </Menu>
          )}
        </Toolbar>
      </AppBar>
      </div>
      
    )
  }
}

Header.prototypes = {
  classes: PropTypes.object.isRequired,
  logo: PropTypes.string,
  logoAltText: PropTypes.string
};

const mapStateToProps = state => {
	return  {
    userinfo: state.auth.userinfo,
    chatInfo: state.chat.chatInfo
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      handleChangeAuthInfo:(userinfo)=>{
        dispatch(authActions.change_user_info(userinfo))
      },
      handleChatNotification:(chatInfo)=>{
        dispatch(chatActions.reset_chat_notification(chatInfo))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(HeaderStyles)(Header))