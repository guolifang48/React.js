import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Wrapper, ActivityStream } from '../../../components';
import SocialStyles from '../../../styles/Social';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FormControl from '@material-ui/core/FormControl';

import {get_user_by_id} from '../../../apis/admin';

const TabContainer = (props) => (
  <Typography component="div" className="pa-0">
    {props.children}
  </Typography>
);

class Social extends Component {
  state = {
    tab: 0,
    userData: {},
    isOpened: false,
    form_file: {}
  };

  componentWillMount() {
    var user_id = this.props.match.params.id;
    get_user_by_id({id: user_id}, (response) => {
      if (typeof(response.data) != 'undefined') {
        this.setState({userData: response.data});
      }
    });
  }

  handleTabToggle = (event, tab) => {
    this.setState({ tab });
  };
  handleDialogClose = (e) => {
    this.setState({isOpened : false});
  }

  render() {
    const { classes } = this.props;
    const { tab, userData } = this.state;

    return (
      <Wrapper>
        <div>
          <Grid container spacing={8}>
            <Grid item>
              <Card>
                <CardContent>
                  <Typography variant="title" gutterBottom><b>{userData.username}</b></Typography>
                  <Grid container spacing={24}>
                    <Grid item xs={12} md={4}>
                      <List>
                        <ListItem>
                          <Typography variant="caption" gutterBottom>Email</Typography>
                        </ListItem>
                        <ListItem>
                          <Typography variant="caption" gutterBottom>PhoneCode</Typography>
                        </ListItem>
                        <ListItem>
                          <Typography variant="caption" gutterBottom>PhoneNumber</Typography>
                        </ListItem>
                        <ListItem>
                          <Typography variant="caption" gutterBottom>Seller Status</Typography>
                        </ListItem>
                        <ListItem>
                          <Typography variant="caption" gutterBottom>User Status</Typography>
                        </ListItem>
                        <ListItem>
                          <Typography variant="caption" gutterBottom>Role</Typography>
                        </ListItem>
                      </List>
                      
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <List>
                        <ListItem>
                          <Typography variant="caption" gutterBottom>{userData.email}</Typography>
                        </ListItem>
                        <ListItem>
                          <Typography variant="caption" gutterBottom>{userData.phone_code}</Typography>
                        </ListItem>
                        <ListItem>
                          <Typography variant="caption" gutterBottom>{userData.phone_number}</Typography>
                        </ListItem>
                        <ListItem>
                          <Typography variant="caption" gutterBottom>{userData.seller_status}</Typography>
                        </ListItem>
                        <ListItem>
                          <Typography variant="caption" gutterBottom>{userData.user_status}</Typography>
                        </ListItem>
                        <ListItem>
                          <Typography variant="caption" gutterBottom>{userData.role}</Typography>
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <div className="text-xs-center">
                        <Avatar
                          alt="Adelle Charles"
                          src={userData.avatar}
                          className={classNames(classes.avatar)}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </Wrapper>
    )
  }
}

Social.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(SocialStyles)(Social);