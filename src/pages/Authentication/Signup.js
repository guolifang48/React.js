import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import SessionStyles from '../../styles/Session';

import { connect } from 'react-redux';
import * as authActions from '../../actions/authActions';

//made by somi
import user_signup from '../../apis/index';
// import Select from '@material-ui/core/Select';
// import Input from '@material-ui/core/Input';
// import MenuItem from '@material-ui/core/MenuItem';
//



const Signup = (props) => {
  const { classes, userinfo } = props;
  const sellerflag = false;
  const buyerflag = false;
  const state = {
      name: [
        '23',
        '234',
        '235',
        '236',
        '2378'
      ]
    }
  const onChangeUserName = (e) => {
    e.preventDefault();
    const new_userinfo = {
      ...userinfo,
      username:e.target.value
    }
    props.handleChangeAuthInfo(new_userinfo);
  }

  const onChangePassword = (e) => {
    e.preventDefault();
    const new_userinfo = {
      ...userinfo,
      password:e.target.value
    }
    props.handleChangeAuthInfo(new_userinfo);
  }
  const onChangeConfirmPassword = (e) => {
    e.preventDefault();
    const new_userinfo = {
      ...userinfo,
      cpassword:e.target.value
    }
    props.handleChangeAuthInfo(new_userinfo);
  }
   const onChangePhoneCode = (e) => {
    e.preventDefault();
    const new_userinfo = {
      ...userinfo,
      phone_code:e.target.value
    }
    props.handleChangeAuthInfo(new_userinfo);
  }

  const onChangePhoneNumber = (e) => {
    e.preventDefault();
    const new_userinfo = {
      ...userinfo,
      phone_number:e.target.value
    }
    props.handleChangeAuthInfo(new_userinfo);
  }

  const onClickedBtnSeller = (e) => {
    this.sellerflag = !this.sellerflag;
  }
  const onClickedBtnAdmin = (e) => {
    this.buyerflag = !this.buyerflag;
  }
  const onClickBtnSignup = () => {
    var error = false;
    Object.keys(userinfo).map(key => {
      if (userinfo[key] == '') {
        error = true;
      }
    });
    if (userinfo.password != userinfo.cpassword) {
      error = true;
    }
    if (error == true) {
      return;
    }

    // api signup
    // user_signup(userinfo, (response)=>{
    // });
  }
  const handleKeyPress = event => {
    if (event.key == 'Enter') {
      onClickBtnSignup();
    }
  }
  return (
    <div className={classNames(classes.session, classes.background)}>
      <div className={classes.content}>
        <div className={classes.wrapper}>
          <Card>
            <CardContent>
              <form Validate>
                <div className="text-xs-center pb-xs">
                  <img src="/static/images/logo-dark.svg" alt=""/>
                  <Typography variant="caption">Create an app id to continue.</Typography>
                </div>
                <TextField
                  id="email"
                  label="Username"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                  value = {userinfo.username}
                  onChange = {onChangeUserName}
                  onKeyPress={handleKeyPress}
                  required={true}
                />
                <TextField
                  id="password"
                  label="Password"
                  className={classes.textField}
                  type="password"
                  fullWidth
                  margin="normal"
                  onKeyPress={handleKeyPress}
                  required={true}
                  value={userinfo.password}
                  onChange = {onChangePassword}
                />
                <TextField
                  id="cpassword"
                  label="Confirm Password"
                  className={classes.textField}
                  type="password"
                  fullWidth
                  margin="normal"
                  value = {userinfo.cpassword}
                  onChange = {onChangeConfirmPassword}
                  onKeyPress={handleKeyPress}
                  required={true}
                />
                <TextField
                  id="phonenumber"
                  label="Phone Code ( Ex: +86)"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                  value = {userinfo.phone_code}
                  onChange = {onChangePhoneCode}
                  onKeyPress={handleKeyPress}
                  required={true}
                />
                <TextField
                  id="phonenumber"
                  label="Phone Number"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                  value = {userinfo.phone_number}
                  onChange = {onChangePhoneNumber}
                  onKeyPress={handleKeyPress}
                  required={true}
                />
                <div className="pt-1 text-xs-center checktag">
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="checkedseller"
                        onChange = {onClickedBtnSeller}
                      />
                    }
                    label="Seller"
                    className={classes.fullWidth}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="checkedadmin"
                        onChange = {onClickedBtnAdmin}
                      />
                    }
                    label="Admin"
                    className={classes.fullWidth}
                    
                  />
                </div>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="checkedA"
                    />
                  }
                  label="I have read and agree to the terms of service."
                  className={classes.fullWidth}
                />
                <Button variant="raised" color="primary" fullWidth type="submit" onClick = {onClickBtnSignup}>Create your account</Button>
                <div className="pt-1 text-xs-center">
                  <Link to="/forgot">
                    <Button>Forgot password?</Button>
                  </Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to="/signin">
                    <Button>Access your account.</Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return  {
    userinfo: state.auth.userinfo
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      handleChangeAuthInfo:(userinfo)=>{
        dispatch(authActions.change_user_info(userinfo))
      }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(SessionStyles)(Signup))
