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
import { mockActivity, mockOwner } from '../../../utils/mock';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ButtonBase from '@material-ui/core/ButtonBase';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FormControl from '@material-ui/core/FormControl';

import { connect } from 'react-redux';
import { get_profile_info , update_profile } from '../../../apis/seller';
import Snackbar from "@material-ui/core/Snackbar";
import { CustomSnack } from '../../../components';

const TabContainer = (props) => (
  <Typography component="div" className="pa-0">
    {props.children}
  </Typography>
);
const style = theme => ({
  
});
class Profile extends Component {
  state = {
    tab: 0,
    userData: [],
    isOpened: false,
    selected_username: '',
    selected_email: '',
    selected_phonecode: '',
    selected_phonenumber: '',
    snackOpen: false,
    snackError: false,
    message: '',
    avatar: ''
  };
  componentWillMount() {
    this.refreshProfile();
  }

  refreshProfile = () => {
    var id = this.props.userinfo.userid;
    get_profile_info({user_id: id}, (response)=> {
      var result = response.data;
      if (result != undefined) 
      {
        this.setState({userData: result});
      }
    });
  }

  handleTabToggle = (event, tab) => {
    this.setState({ tab });
  };

  validation = () => {
    if (this.state.selected_username == '') {
      this.setState({snackError:true});
      this.setState({message: 'please input your name.'});
      this.setState({snackOpen: true});
      return false;
    }
    if (this.state.selected_email == '') {
      this.setState({snackError:true});
      this.setState({message: 'please input your email.'});
      this.setState({snackOpen: true});
      return false;
    }
    if (this.state.selected_phonecode == '') {
      this.setState({snackError:true});
      this.setState({message: 'please input your phone code.'});
      this.setState({snackOpen: true});
      return false;
    }
    if (this.state.selected_phonenumber == '') {
      this.setState({snackError:true});
      this.setState({message: 'please input your phone number.'});
      this.setState({snackOpen: true});
      return false;
    }
    return true;
  }

  handleDialogClose = (e) => {
    this.setState({isOpened : false});
  }
  handleDialogEdit = (e) => {
    if (this.validation()) {
      this.setState({isOpened : false});
      var obj = {
        'user_id': this.props.userinfo.userid,
        'username': this.state.selected_username,
        'email': this.state.selected_email,
        'phone_code': this.state.selected_phonecode,
        'phone_number': this.state.selected_phonenumber
      }
      update_profile(obj, (response)=> {
        if (response.data != undefined) {
          var result = response.data;
          if (result.success) {
            this.setState({message: result.msg});
            this.setState({snackError: false});
            this.refreshProfile();// refresh
          } else {
            this.setState({message: 'failed updated.'});
            this.setState({snackError: true});
          }
            this.setState({snackOpen: true});
          }
      });
    } else {
      this.setState({isOpened : true});
    }
  }

  onClickEditProfile = (e) => {
    this.setState({selected_username: this.state.userData.username});
    this.setState({selected_email: this.state.userData.email});
    this.setState({selected_phonecode: this.state.userData.phone_code});
    this.setState({selected_phonenumber: this.state.userData.phone_number});
    this.setState({isOpened : true});
  }
  onChangeUserName = (e) => {
    this.setState({selected_username: e.target.value});
  }
  onChangePhoneCode = (e) => {
    this.setState({selected_phonecode: e.target.value});
  }
  onChangeEmail = (e) => {
    this.setState({selected_email: e.target.value});
  }
  onChangePhoneNumber = (e) => {
    this.setState({selected_phonenumber: e.target.value});
  }
  //Snackbar

  handleCloseSnackbar = () => {
    this.setState({snackOpen: false});
  }

  render() {
    const { classes } = this.props;
    const { tab , userData} = this.state;

    return (
      <Wrapper>
        <div>
          <Dialog
            open={this.state.isOpened}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Profile Edit</DialogTitle>
            <DialogContent>
              <TextField
                id="email"
                label="Username"
                className={classes.textField}
                fullWidth
                margin="normal"
                value = {this.state.selected_username}
                onChange = {this.onChangeUserName}
              />
              <TextField
                id="phonenumber"
                label="Email"
                className={classes.textField}
                fullWidth
                margin="normal"
                value = {this.state.selected_email}
                onChange = {this.onChangePhoneCode}
              />
              <TextField
                id="phonenumber"
                label="Phone Code ( Ex: +86)"
                className={classes.textField}
                fullWidth
                margin="normal"
                type="number"
                value = {this.state.selected_phonecode}
                onChange = {this.onChangePhoneCode}
              />
              <TextField
                id="phonenumber"
                label="Phone Number"
                className={classes.textField}
                fullWidth
                margin="normal"
                value = {this.state.selected_phonenumber}
                onChange = {this.onChangePhoneNumber}
              />
              
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleDialogEdit} color="primary">
                Edit
              </Button>
            </DialogActions>
          </Dialog>
					<Snackbar
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						open={this.state.snackOpen}
						autoHideDuration={6000}
						onClose={this.handleCloseSnackbar}
						>
						<CustomSnack
							onClose={this.handleCloseSnackbar}
							variant={this.state.snackError == false ? 'success' : 'error'}
							message={this.state.message}
					  />
          </Snackbar>
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
                      </List>
                      
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <List>
                        <ListItem>
                          <Typography variant="caption" gutterBottom>{userData.email}</Typography>
                        </ListItem>
                        <ListItem>
                          <Typography variant="caption" gutterBottom>+{userData.phone_code}</Typography>
                        </ListItem>
                        <ListItem>
                          <Typography variant="caption" gutterBottom>{userData.phone_number}</Typography>
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      
                    </Grid>
                    <Button variant="raised" color="primary" onClick={this.onClickEditProfile}>Edit Profile</Button>
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

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
	return  {
		userinfo: state.auth.userinfo
	};
}
export default connect(mapStateToProps, null)(withStyles(SocialStyles)(Profile));