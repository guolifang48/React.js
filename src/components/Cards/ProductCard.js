import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { formatPrice } from '../../helpers';
import ProductCardStyles from '../../styles/ProductCard';

const ProductCard = (props) => {
  const { classes, id, name, price, description, sale, discounted, discount, product } = props;
  return (
    <Card>
      <div className={classes.mediaGrid}>
        <figure className={classes.figure}>
          { sale &&
            <div className={classes.badge}>
              <Typography className={classes.badgeText}>Sale</Typography>
            </div>
          }
          <img alt={name} src={`/static/images/unsplash/${id}.jpg`}  className={classes.figureImg} />
        </figure>
      </div>
      <CardContent className="pa-1">
        <Grid container spacing={0} direction="row" justify="space-between" alignItems="center">
          <Grid item>
            <Typography>{ name }</Typography>
            <Typography variant="caption">{ name }</Typography>
          </Grid>
          <Grid item className={classNames(classes.price, 'mat-text-primary text-xl')}>
            { discounted &&
              <Typography variant="caption" className="strikethrough" component="span">{ formatPrice(discount) }</Typography>
            }
            <Typography variant="title" className={classes.mainPrice}> { formatPrice(price) }</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

ProductCard.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number,
  name: PropTypes.string,
  price: PropTypes.number,
  description: PropTypes.string,
  sale: PropTypes.bool,
  discounted: PropTypes.bool,
  discount: PropTypes.number,
};

export default withStyles(ProductCardStyles)(ProductCard);