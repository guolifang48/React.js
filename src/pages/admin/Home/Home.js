import React, { Component } from 'react';
import { Bar, Bubble } from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import LocalOfferIcon from '@material-ui/icons/LocalOffer';
// import PhoneIcon from '@material-ui/icons/Phone';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import EmailIcon from '@material-ui/icons/Email';
import SettingsIcon from '@material-ui/icons/Settings';
import MoreIcon from '@material-ui/icons/More';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import { Wrapper, NewsCard, StatCard, WeatherCard, PostCard } from '../../../components';
import { Wrapper, NewsCard, WeatherCard, PostCard } from '../../../components';
import { connect } from 'react-redux';

let id = 0;
function createData(name, date, progress) {
  id += 1;
  return { id, name, date, progress };
}

const data = [
  createData('UI prototyping', 'January 23', 67),
  createData('Design', 'February 2', 87),
  createData('Development', 'March 30', 54),
  createData('Testing and delivery', 'April 12', 34),
  createData('Ongoing maintanance', 'May 28', 56),
  createData('Extensive review', 'December 3', 56),
];

class Home extends Component {
  state = {
    anchorEl: null,
  };

  constructor(props) {
    super(props);
    const { userinfo } = props;
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    
    return (
      <Wrapper>
        
      </Wrapper>
    )
  }
}

const mapStateToProps = state => {
  return  {
    userinfo: state.auth.userinfo
  };
}

export default connect(mapStateToProps)(Home)