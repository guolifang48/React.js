import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import WidgetStyles from '../../styles/Widget';

const ProfileCard = (props) => {
  const { classes, name, image, location, stats } = props;
  return (
    <Card className="text-xs-center">
      <CardContent className={classNames(classes.content, 'px-0')}>
        <Grid
          container
          spacing={0}
          alignItems={'center'}
          direction={'row'}
          justify={'space-around'}
        >
          <Grid item >
            <IconButton aria-label="Send message">
              <EmailIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Avatar
              alt={name}
              src={image}
              className={classes.avatar}
            />
          </Grid>
          <Grid item >
            <IconButton aria-label="Call">
              <PhoneIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Typography variant="title" gutterBottom>{name}</Typography>
        <Typography variant="caption">{location}</Typography>
      </CardContent>
      <Divider />
      <CardContent className={classes.content}>
        <Grid
          container
          spacing={0}
          alignItems={'center'}
          direction={'row'}
          justify={'space-between'}
        >
        </Grid>
      </CardContent>
    </Card>
  );
}

ProfileCard.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  image: PropTypes.string,
  location: PropTypes.string,
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.number
    })
  ).isRequired
};

export default withStyles(WidgetStyles)(ProfileCard);