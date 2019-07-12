import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import withWidth from '@material-ui/core/withWidth';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import SidebarItem from './SidebarItem'
import SidebarStyles from '../../styles/Sidebar';

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

class Sidebar extends Component {
  state = {
    activeRoute: undefined
  }

  toggleMenu = (index) => {
    if (this.state.activeRoute === index) index = undefined;
    this.setState({ activeRoute: index })
  }

  render() {
    const { classes, opened, toggleDrawer , routes, location } = this.props;
    const { activeRoute } = this.state;
    const menu = (
      <List component="div">
        { routes.map((route, index) => {
          const isCurrentPath = location.pathname.indexOf(route.path) > -1 ? true : false;
          return (
            <SidebarItem
              key={index}
              index={index}
              route={route}
              activeRoute={activeRoute}
              toggleMenu={this.toggleMenu}
              currentPath={isCurrentPath}
            />
          )
        })}
      </List>
    )
    return (
      <Fragment>
        <Hidden smDown>
          <Drawer
            variant="persistent"
            classes={{
              paper: classes.drawerPaper,
            }}
            open={opened}
            ModalProps={{
              keepMounted: false,
              className: classes.modal,
              BackdropProps: {
                className: classes.backdrop,
              },
              onBackdropClick: toggleDrawer
            }}
          >
            {menu}
          </Drawer>
        </Hidden>
        <Hidden mdUp>
          <SwipeableDrawer
            variant="temporary"
            classes={{
              paper: classes.drawerPaper,
            }}
            open={opened}
            onClose={toggleDrawer}
            onOpen={toggleDrawer}
            disableBackdropTransition={!iOS}
            ModalProps={{
              keepMounted: false,
              className: classes.modal,
              BackdropProps: {
                className: classes.backdrop,
              },
              onBackdropClick: toggleDrawer
            }}
          >
            {menu}
          </SwipeableDrawer>
        </Hidden>
      </Fragment>
    )
  }
}

Sidebar.prototypes = {
  classes: PropTypes.object.isRequired,
  opened: PropTypes.func,
  toggleDrawer: PropTypes.func,
  closeDrawer: PropTypes.func,
  openDrawer: PropTypes.func,
  routes: PropTypes.object
};

const SidebarWithRouter = withRouter(Sidebar)

export default withStyles(SidebarStyles)(withWidth()(SidebarWithRouter));