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
import { Link, Redirect} from 'react-router-dom';
import SessionStyles from '../../styles/Session';
import { connect } from 'react-redux';
import * as authActions from '../../actions/authActions';
import { user_login } from '../../apis';

const Signin = (props) => {
  const { classes, userinfo } = props;

  const onChangeUserPhoneNumber = (e) => {
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

  const onClickBtnLogin = (e) => {
    e.preventDefault();
    if (userinfo.country_code == '' || userinfo.username == '' || userinfo.password == '') {
      return;
    }

    user_login(userinfo, (response)=>{
      if(response.data.success){
        const new_userinfo = {
          ...userinfo,
          userid:response.data.userid,
          isLogin:true,
          role:response.data.role
        }
        props.handleChangeAuthInfo(new_userinfo);
      }
    });

  }

  const handleKeyPress = event => {
    if (event.key == 'Enter') {
      onClickBtnLogin(event);
    }
  }

  const renderRedirect = () => {
    if (userinfo.isLogin) {
      return <Redirect to='/' />
    }
  }
  return (
    <div className={classNames(classes.session, classes.background)}>
    {renderRedirect()}
      <div className={classes.content}>
        <div className={classes.wrapper}>
          <Card>
            <CardContent>
              <form validate="true">
                <div className="text-xs-center pb-xs">
                  <img src="/static/images/logo-dark.svg" alt=""/>
                  <Typography variant="caption">Sign in with your app id to continue.</Typography>
                </div>
                <TextField
                  id="username"
                  label="User Name"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                  value = {userinfo.username}
                  onChange = {onChangeUserPhoneNumber}
                  required={true}
                />
                
                <TextField
                  id="password"
                  label="Password"
                  className={classes.textField}
                  type="password"
                  fullWidth
                  margin="normal"
                  value = {userinfo.password}
                  onChange = {onChangePassword}
                  onKeyPress={handleKeyPress}
                  required={true}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      value="checkedA"
                    />
                  }
                  label="Stayed logged in"
                  className={classes.fullWidth}
                />
                <Button variant="raised" color="primary" type="submit" fullWidth onClick = {onClickBtnLogin}>Login</Button>
                <div className="pt-1 text-md-center">
                  <Link to="/forgot">
                    <Button>Forgot password?</Button>
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

Signin.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(SessionStyles)(Signin))
