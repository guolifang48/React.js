import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import SidebarItemStyles from '../../styles/SidebarItem';
import { capitalize } from '../../helpers';

class SidebarItem extends Component {

  componentDidMount() {
    if (!this.props.currentPath || this.props.activeRoute === this.props.index || this.props.route.path === '/') return;
    this.props.toggleMenu(this.props.index)
  }

  render() {
    const { classes, route, index, activeRoute, toggleMenu } = this.props;

    const badge = (badge) => {
      if (!badge) return;
      const badgeClassName = classNames(classes.badge, {
        [classes[`${badge.type}`]]: badge.type !== 'default',
      });
      return <Typography className={classNames(classes.badge, badgeClassName)} component="div">{badge.value}</Typography>;
    }

    if (route.type === 'external') {
      return (
        <a href={route.path} target="_blank" key={index} className={classes.menuLink}>
          <ListItem className={classes.menuItem} button>
            <ListItemIcon>
              <route.icon className={classes.menuIcon} />
            </ListItemIcon>
            <Typography variant="body1" className="flexSpacer">{capitalize(route.name)}</Typography>
            {badge(route.badge)}
          </ListItem>
        </a>
      );
    }

    if (route.type === 'submenu') {
      return (
        <div className={activeRoute === index ? classes.menuCollapsed : classes.menuClosed}>
          <ListItem className={classes.menuItem} button key={index} onClick={() => toggleMenu(index)}>
            <ListItemIcon>
              <route.icon className={classes.menuIcon} />
            </ListItemIcon>
            <Typography variant="body1" className="flexSpacer">{capitalize(route.name)}</Typography>
            {badge(route.badge)}
            <ListItemIcon className={classes.caret}>
              {activeRoute === index ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </ListItemIcon>
          </ListItem>
          <Collapse in={activeRoute === index ? true : false} timeout="auto" unmountOnExit>
            <List disablePadding>
              {route.children.map((subitem, index) => (
                  <NavLink to={`${route.path ? route.path : ''}${subitem.path ? subitem.path : ''}`} exact className={classes.menuLink} activeClassName={classes.menuActive} key={index}>
                    <ListItem className={classes.menuSubItem} button>
                      <Typography variant="body1" className="flexSpacer">{capitalize(subitem.name)}</Typography>
                      {badge(subitem.badge)}
                    </ListItem>
                  </NavLink>)
              )}
            </List>
          </Collapse>
        </div>
      )
    }

    return (
      <NavLink to={route.path} exact className={classes.menuLink} activeClassName={classes.menuActive} key={index}>
        <ListItem className={classes.menuItem} button onClick={() => toggleMenu(index)}>
          <ListItemIcon>
            <route.icon className={classes.menuIcon} />
          </ListItemIcon>
          <Typography variant="body1" className="flexSpacer">{capitalize(route.name)}</Typography>
          {badge(route.badge)}
        </ListItem>
      </NavLink>
    )
  }
}

SidebarItem.prototypes = {
  classes: PropTypes.object.isRequired,
  route: PropTypes.object,
  index: PropTypes.number,
  activeRoute: PropTypes.number,
  toggleMenu: PropTypes.func
};

export default withStyles(SidebarItemStyles)(SidebarItem);