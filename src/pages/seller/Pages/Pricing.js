import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Wrapper, Pricing } from '../../../components';
import { mockPricing } from '../../../utils/mock';
import PricingStyles from '../../../styles/Pricing';

const PricingPage = (props) => {
  const { classes } = props;
  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <FormGroup row className={classes.centered}>
            <FormControlLabel
              control={
                <Switch
                  value="payment"
                />
              }
              label="Pay annual to save 25%"
              classes={{
                label: classes.label,
              }}
            />
          </FormGroup>
        </Toolbar>
        <Toolbar></Toolbar>
      </AppBar>

      <Wrapper padding={false}>
        <Grid container spacing={0} justify="center" className={classes.pricingTable}>
          <Grid item xs={10}>
            <Grid container spacing={8} direction="row" justify="center">
              {mockPricing.map((item, index) => (
                <Grid item  xs={12} sm={6} md={3} key={index}>
                  <Pricing
                    title={item.title}
                    subtitle={item.subtitle}
                    price={item.price}
                    features={item.features}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Wrapper>
    </Fragment>
  );
}

PricingPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(PricingStyles)(PricingPage);