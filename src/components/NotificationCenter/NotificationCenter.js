import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import LinearProgress from '@material-ui/core/LinearProgress';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import format from 'date-fns/format';
import NotificationCenterStyles from '../../styles/NotificationCenter';
import { formatPrice, getStocks, getWeather, getWeatherIcon } from '../../helpers';

import Avatar from '@material-ui/core/Avatar';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import mockData from '../../utils/mock/admin_mock';

import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';

import PeopleIcon from '@material-ui/icons/People';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

import { get_all_notification } from '../../apis/seller';
import { connect } from 'react-redux';

const styles = theme => ({ 
   indigoText: {
    color: indigo[500],
    backgroundColor: 'transparent'
  },
  redText: {
    color: red[500],
    backgroundColor: 'transparent'
  },
  yellowText: {
    color: yellow[500],
    backgroundColor: 'transparent'
  },
  defaultText: {
    backgroundColor: 'transparent',
    color: 'inherit'
  }
});

class NotificationCenter extends Component {

  state = {
    tab: 0,
    stocks: undefined,
    forecast: undefined,
    notifi_data: [],
    unread_count: 0
  };

  mounted = true;

  handleTabToggle = (event, tab) => {
      this.setState({ tab });
  };
  constructor(props) {
    super(props);
  }
 
  getAllNotification = () => {
    var obj = {
      'offset': 0,
      'limit': 30,
      'user_id' : this.props.userinfo.userid
    }
    get_all_notification(obj, (response) => {
      console.log(response);
      if (typeof(response.data) != 'undefined') {
        var result = response.data;
        var temp_arr = [];
        for (var i = 0 ; i < result.length; i++) {
          if (result[i].noti_type == "CUSTOMER") {
            temp_arr.push(
              {
                avatar: <Avatar style={{...styles.redText}}><LocalOfferIcon /></Avatar>,
                title: 'Order',
                subtitle: result[i].content,
                created: result[i].created
              }
            );
          } else if (result[i].noti_type == "SYSTEM") {
            temp_arr.push(
              {
                avatar: <Avatar style={{...styles.redText}}><LocalOfferIcon /></Avatar>,
                title: 'Order',
                subtitle: result[i].content,
                created: result[i].created
              }
            );
          }
        }
        this.setState({notifi_data: temp_arr});
      }
    });
  }
  async componentDidMount() {
    this.getAllNotification();
    
    const stocks = await getStocks('MSFT,FB,AAPL,GOOG,DAX');
    const forecast = await getWeather('london', 'uk', 1);

    if (this.mounted) {
        if (stocks) this.setState({ stocks });
        if (forecast) this.setState({ forecast })
    }
  }
  componentWillUnmount() {
      this.mounted = false;
  }

  render() {
    const { classes, notificationsOpen, toogleNotifications} = this.props;
    const { tab, stocks, forecast ,notifi_data} = this.state;
    const today = Date.now();
    return (
      <Drawer
        variant="temporary"
        anchor="right"
        open={notificationsOpen}
        ModalProps={{
          keepMounted: false,
          className: classes.modal,
          BackdropProps: {
            className: classes.backdrop,
          },
          onBackdropClick: toogleNotifications
        }}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Tabs
          value={tab}
          onChange={this.handleTabToggle}
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
          centered
          fullWidth
        >
          <Tab
            classes={{ root: classes.tabRoot }}
            label="Notifications"
          />
        </Tabs>
        <div className={classes.container}>
          { tab === 0 &&
            <List>
              { notifi_data.map((notification, index) => (
                <ListItem button key={index}>
                  {notification.avatar}
                  <ListItemText primary={notification.title} secondary={notification.subtitle} />
                </ListItem>
              ))}
            </List>
          }
        </div>
      </Drawer>
    );
  }
}

NotificationCenter.propTypes = {
    classes: PropTypes.object.isRequired,
    notificationsOpen: PropTypes.bool,
    toogleNotifications: PropTypes.func
}
const mapStateToProps = state => {
  return  {
    userinfo: state.auth.userinfo
  };
}
export default connect(mapStateToProps, null)(withStyles(NotificationCenterStyles)(NotificationCenter));