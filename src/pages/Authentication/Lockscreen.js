import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import SessionStyles from '../../styles/Session';

const Lockscreen = (props) => {
  const { classes } = props;
  return (
    <div className={classNames(classes.session, classes.background)}>
      <div className={classes.content}>
        <div className={classes.lockscreenWrapper}>
          <Card className={classes.card}>
            <CardContent>
              <form>
                <div className={classes.avatar}>
                  <img src="/static/images/avatar.jpg" alt="user" title="user"/>
                </div>
                <Typography variant="body1" className="mt-1">David Miller</Typography>
                <TextField
                  id="username"
                  label="Username"
                  className={classNames(classes.textField, 'mt-0 mb-1')}
                  fullWidth
                  margin="normal"
                />
                <Button variant="contained" color="primary" type="submit">Unlock</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

Lockscreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(SessionStyles)(Lockscreen);