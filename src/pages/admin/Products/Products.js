import React, { Component, Fragment } from 'react';
// import {ExcelFile, ExcelSheet} from 'react-data-export';
import { Redirect, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListSubheader from '@material-ui/core/ListSubheader';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import { Wrapper, ProductCard } from '../../../components';
import EcommerceStyles from '../../../styles/Ecommerce';
import mockData from '../../../utils/mock/admin_mock';

let categories = [];
let shops = [];
class Products extends Component {
  state = {
    opened: false,
    products: []
  }


  handleDrawerToggle = () => {
    this.setState({ opened: !this.state.opened });
  }

  searchByShopAndCategory = (type, value, el) => {
    const { opened, products } = this.state;
    if (el.currentTarget.checked == true) {
      if (type == 'Shop') {
        shops.push(value);
      }
      else if (type == 'Category') {
        categories.push(value);
      }
    }
    else {
      if (type == 'Shop') {
        shops.splice(shops.indexOf(value), 1);
      }
      else if (type == 'Category') {
        categories.splice(categories.indexOf(value), 1); 
      }
    }

    /*
    * api get_products_by_shop_and_category
    * params shops, categories
    * return products
    */

    let tmp_products = [];

    mockData.mockProducts.map(product => {
      if ((categories.indexOf(product.category.id) != -1) || (shops.indexOf(product.store.id) != -1)) {
        tmp_products.push(product);
      }  
    });

    if (categories.length == 0 && shops.length == 0) {
      this.setState({ products: mockData.mockProducts });
    }
    else {
      this.setState({ products:tmp_products });
    }
  }

  // showProductDetail = (p) => {
  //   // go to the product detail page
  //   alert();
  //   <Redirect to={"/signin"} />
  // }

  componentDidMount () {
    let products = [];
    let t_products = [];

    /*
    * api get_all_items
    * params none
    * return products
    */

    products = mockData.mockProducts;

    this.setState({ products });
  }

  render() {
    const { classes } = this.props;
    const { opened, products } = this.state;

    const showProductDetail = () => {
      return <Redirect to={"/"} />
    }

    const menu = (
      <Fragment>
        <List subheader={<ListSubheader disableSticky>Shops</ListSubheader>}>
          { mockData.mockStores.map(value => (
            <ListItem
              key={value.id}
              role={undefined}
              button
            >
              <Checkbox
                tabIndex={-1}
                disableRipple
                className={classes.checkbox}
                onChange={(el) => this.searchByShopAndCategory('Shop', value.id, el)}
              />
              <ListItemText primary={value.store_name} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List subheader={<ListSubheader disableSticky>Category</ListSubheader>}>
          { mockData.mockCategories.map(value => (
            <ListItem
              key={value.id}
              role={undefined}
              button
              className={classes.listItem}
            >
              <Checkbox
                tabIndex={-1}
                disableRipple
                className={classes.checkbox}
                onChange={(el) => this.searchByShopAndCategory('Category', value.id, el)}
              />
              <ListItemText primary={value.name} />
            </ListItem>
          ))}
        </List>
      </Fragment>
    );

    return (
      <Wrapper padding={false}>
        <Hidden mdUp>
          <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.toolBar}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => this.handleDrawerToggle()}>
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                Products
              </Typography>
            </Toolbar>
          </AppBar>
        </Hidden>
        <Grid className={classes.root}>
          <Hidden smDown>
            <Drawer
              variant="permanent"
              ModalProps={{
                keepMounted: false,
                className: classes.modal,
                BackdropProps: {
                  className: classes.backdrop
                },
                onBackdropClick: this.handleDrawerToggle
              }}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {menu}
            </Drawer>
          </Hidden>
          <Hidden mdUp>
            <Drawer
              variant="temporary"
              open={opened}
              ModalProps={{
                keepMounted: false,
                className: classes.modal,
                BackdropProps: {
                  className: classes.backdrop,
                },
                onBackdropClick: this.handleDrawerToggle
              }}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {menu}
            </Drawer>
          </Hidden>
          <main className={classes.content}>
            <Grid container spacing={8}>
              {products.map((pt, index) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={index} onClick={showProductDetail}>
                  <NavLink to={`/product/${pt.id}`}>
                    <ProductCard
                      id={pt.id}
                      name={pt.item_name}
                      price={pt.price}
                      description={pt.description}
                      sale={pt.sale}
                      discounted={pt.discounted}
                      discount={pt.discount}
                      category={pt.category}
                      shop={pt.shop}
                      product={pt}
                    />
                  </NavLink>
                </Grid>
              ))}
            </Grid>
          </main>
        </Grid>
      </Wrapper>
    );
  }
}

Products.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(EcommerceStyles)(Products);