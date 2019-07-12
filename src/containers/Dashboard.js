import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import FormatTextdirectionRToLIcon from '@material-ui/icons/FormatTextdirectionRToL';
import FormatTextdirectionLToRIcon from '@material-ui/icons/FormatTextdirectionLToR';
import SettingsIcon from '@material-ui/icons/Settings';
import { AppContext, Workspace, Header, Sidebar, NotificationCenter, ChatCenter } from '../components';
import DashboardStyles from '../styles/Dashboard';
import { MobileBreakpoint } from '../styles/variables';
import {adminRoute, sellerRoute} from '../routes';
import { connect } from 'react-redux';
import * as roleTypes from '../constants/roleTypes';
import { get_unread_chat_count, get_all_unread_chat_history, set_chat_read }  from '../apis/seller';
import * as chatActions from '../actions/chatActions';


function resizeDispatch () {
  if (typeof(Event) === 'function') {
    window.dispatchEvent(new Event('resize'));
  } else {
    const evt = window.document.createEvent('UIEvents');
    evt.initUIEvent('resize', true, false, window, 0);
    window.dispatchEvent(evt);
  }
}

class Dashboard extends Component {
  state = {
    opened: true,
    notificationsOpen: false,
    chatsOpen: false,
    type: 'light',
    direction: 'ltr',
    openSpeedDial: false
  };

  componentWillMount() {
    var postInfo = {
      user_id: this.props.userinfo.userid
    }
    
    // get_all_unread_chat_history(postInfo, (response) => {
    //   if (response.data != undefined) {
    //     var chatInfo = {
    //       cntUnreadChatting: response.data.length,
    //       aryUnreadChatting: response.data
    //     }
    //     this.props.handleChatNotification(chatInfo);
    //   }
    // })
  }

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

  mediaMatcher = matchMedia(`(max-width: ${MobileBreakpoint}px)`);

  handleDrawerToogle = () => {
    this.setState({ opened: !this.state.opened });
    resizeDispatch()
  };

  handleNotificationToogle = () => {
    this.setState({chatsOpen: false});      
    this.setState({ notificationsOpen: !this.state.notificationsOpen });
  }

  handleChatToogle = () => {
    this.setState({notificationsOpen: false});
    this.setState({chatsOpen: !this.state.chatsOpen});
  }

  handleFullscreenToogle = () => {
    const element = document.querySelector('#root');
    const isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;

    element.requestFullScreen = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || function () { return false; };
    document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || function () { return false; };
    isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
  }

  handleSpeedDialOpen = () => {
    this.setState({ openSpeedDial: true });
  };

  handleSpeedDialClose = () => {
    this.setState({ openSpeedDial: false });
  };

  componentDidMount() {
    if (this.mediaMatcher.matches) this.setState({ opened: false });    

    this.mediaMatcher.addListener(match => {
      setTimeout(() => {
        if(match.matches) {
          this.setState({ opened: false })
        } else {
          this.setState({ opened: true })
        }
      }, 300)
    })

    this.unlisten = this.props.history.listen(() => {
      // if(this.mediaMatcher.matches) this.setState({ opened: false });
      // document.querySelector('#root > div > main').scrollTop = 0;
    });
  }

  componentWillUnmount() {
    this.unlisten();
    this.mediaMatcher.removeListener(match => {
      setTimeout(() => {
        if(match.matches) {
          this.setState({ opened: false })
        } else {
          this.setState({ opened: true })
        }
      }, 300)
    });
  }


  determineRoleRoutes(){
    switch(this.props.role){
      case roleTypes.ADMIN:
        return adminRoute;
      case roleTypes.SELLER:
        return sellerRoute;
      default:
           return sellerRoute;
    }
  }
  render() {
    const { classes } = this.props;
    const { opened, notificationsOpen, openSpeedDial, chatsOpen } = this.state;
    const routes = this.determineRoleRoutes();
    const getRoutes = (
      <Switch>
        { routes.items.map((item, index) => (
          item.type === 'external' ? <Route exact path={item.path} component={item.component} name={item.name} key={index} />:
          item.type === 'submenu' ? item.children.map(subItem => <Route exact path={`${item.path}${subItem.path}`} component={subItem.component} name={subItem.name} />):
          <Route exact path={item.path} component={item.component} name={item.name} key={index} />
        ))}
        { routes.details.map((detail, index) => (
          <Route exact path={detail.path} component={detail.component} name={detail.name} key={index+routes.items.length} />
        ))}
        <Redirect to="/404" />
      </Switch>
    )

    

    return (
      <Fragment>
        <Header
          toogleNotifications={this.handleNotificationToogle}
          toogleFullscreen={this.handleFullscreenToogle}
          toogleDrawer={this.handleDrawerToogle}
          toogleChat={this.handleChatToogle}
        />
        <div className={classNames(classes.panel, 'theme-dark')}>
          <Sidebar
            routes={routes.items}
            opened={opened}
            toggleDrawer={this.handleDrawerToogle}
          />
          <Workspace opened={opened}>
            {getRoutes}
          </Workspace>
          <NotificationCenter
            notificationsOpen={notificationsOpen}
            toogleNotifications={this.handleNotificationToogle}
          />
          <ChatCenter
            chatsOpen={chatsOpen}
            toogleChats={this.handleChatToogle}
            cntUnreadChatting = {this.state.cntUnreadChatting}
            setChatRead = {this.setChatRead}
            />
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
	return  {
    isLogin: state.auth.userinfo.isLogin,
    role: state.auth.userinfo.role,
    userinfo: state.auth.userinfo,
    chatInfo: state.chat.chatInfo
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChatNotification:(chatInfo)=>{
      dispatch(chatActions.reset_chat_notification(chatInfo))
    }
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(DashboardStyles)(Dashboard))