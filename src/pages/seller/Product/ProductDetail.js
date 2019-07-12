import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import { Wrapper } from '../../../components';
import { formatPrice } from '../../../helpers';
import EcommerceDetailStyles from '../../../styles/EcommerceDetail';
import { get_product_by_id } from '../../../apis/seller';
import { getHostAddress } from '../../../apis/index';

class ProductDetail extends Component {

  state = {
    tab: 0,
    product: {},
    store_name: '',
    category_name: '',
    created: '',
  };

  componentDidMount() {
    let pt_id = this.props.match.params.id;
    get_product_by_id({product_id: pt_id}, (response) => {
      if (response.data !== undefined) 
      {
        var result = response.data;
        this.setState({store_name: result.store.store_name});
        this.setState({category_name: result.category.name});
        this.setState({created: result.created_at});
        this.setState({product: result});
      }
    });
  }

  handleTabToggle = (event, tab) => {
    // if (this.product.reviews != 0) {
    //   this.setState({ tab });
    // }
  };

  render() {
    const { classes } = this.props;
    const { tab, product,store ,created} = this.state;
    return (
      <Wrapper>
        <Card className={classes.card}>
          <Grid container spacing={0} direction={'row'} alignItems={'stretch'}>
            <Grid item xs={12} sm={6} md={5}>
              <img  src={`${getHostAddress()}${product.photo_url}`}  className={classes.imageHeader} />
            </Grid>
            <Grid item xs={12} sm={6} md={7} className="pa-1">
              <Typography variant="title">{ product.item_name }</Typography>
              <Typography gutterBottom>
                { [1, 2, 3, 4, 5].map(star => (
                  <span className={star <= product.score ? null : classes.inactive} key={star}>&#9733;</span>
                ))}
              </Typography>

              <Typography variant="headline" className="mt-1" gutterBottom>
                <span>Cost:  { formatPrice(product.cost) }</span>
                <span>Amount :   {product.amount}</span>
                <span>Store Name :  {this.state.store_name}</span>
                <span>Category :   {this.state.category_name}</span>
              </Typography>

              <div className="block my-1"></div>
              <div className={classes.tabContainer}>
                <Tabs
                  value={tab}
                  onChange={this.handleTabToggle}
                  classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                  scrollable
                  scrollButtons="auto"
                >
                  <Tab
                    disableRipple
                    classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                    label="Description"
                  />
                  <Tab
                    disableRipple
                    classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                    label="Customer Reviews"
                  />
                </Tabs>
                { tab === 0 &&
                  <CardContent>
                    <Typography gutterBottom>{product.description}</Typography>
                  </CardContent>
                }
                { tab === 1 &&
                  <CardContent>
                    <List>
                      
                    </List>
                  </CardContent>
                }
              </div>
            </Grid>
          </Grid>

          
        </Card>
      </Wrapper>
    );
  }
}

ProductDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(EcommerceDetailStyles)(ProductDetail);