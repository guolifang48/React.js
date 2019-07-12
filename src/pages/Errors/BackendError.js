import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SessionStyles from '../../styles/Session';

const BackendError = (props) => {
  const { classes } = props;
  return (
    <div className={classes.session}>
      <div className={classes.content}>
        <Typography className={classes.title}>500</Typography>
        <Typography className={classes.subtitle}>We have an internal server error!</Typography>
        <Typography variant="caption">Sorry, but the page you were trying to view does not exist. <a>Report this error?</a></Typography>
      </div>
    </div>
  );
}

BackendError.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(SessionStyles)(BackendError);