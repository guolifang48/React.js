import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import SessionStyles from '../../styles/Session';

const PasswordReset = (props) => {
  const { classes } = props;
  return (
    <div className={classNames(classes.session, classes.background)}>
      <div className={classes.content}>
        <div className={classes.wrapper}>
          <Card>
            <CardContent>
              <form>
                <div className="text-xs-center pb-xs">
                  <img src="/static/images/logo-dark.svg" alt=""/>
                  <Typography variant="caption">Enter your email and we'll send you instructions on how to reset your password.</Typography>
                </div>
                <TextField
                  id="email"
                  label="Email Address"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                />
                <Button variant="raised" color="primary" fullWidth className="mt-1" type="submit">Send password reset</Button>
                <div className="pt-1 text-xs-center">
                  <Link to="/signin">
                    <Button>Sign</Button>
                  </Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to="/signup">
                    <Button>Create new account.</Button>
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

PasswordReset.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(SessionStyles)(PasswordReset);