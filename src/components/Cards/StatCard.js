import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import StatCardStyles from '../../styles/StatCard';

const StatCard = (props) => {
  const { classes, type, title, value, icon, color } = props;

  let before = null;
  let after = null;

  const cardIcon = (
    <Grid item className={type === 'fill' ? classes.iconFloat : null }>
      <IconButton className={classes.icon} aria-label={title} style={{backgroundColor: color}}>
        {icon}
      </IconButton>
    </Grid>
  );

  if (icon) {
    type === 'fill' ? after = cardIcon : before = cardIcon;
  }

  return (
    <Card style={type === 'fill' ? {backgroundColor: color} : null}>
      <CardContent className={classes.content}>
        <Grid
          container
          alignItems={'center'}
          direction={'row'}
          justify={'flex-start'}
        >
          {before}
          <Grid item>
            <div className={ type === 'fill' ? 'pr-1' : 'px-1' }>
              <Typography variant="title" className={ type === 'fill' ? classes.lightText : null }>{value}</Typography>
              <Typography variant="caption" className={ type === 'fill' ? classes.lightText : null }>{title}</Typography>
            </div>
          </Grid>
          {after}
        </Grid>
      </CardContent>
    </Card>
  );
}

StatCard.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.oneOf([
    "fill"
  ]),
  title: PropTypes.string,
  value: PropTypes.number,
  icon: PropTypes.element,
  color: PropTypes.string
};

export default withStyles(StatCardStyles)(StatCard);