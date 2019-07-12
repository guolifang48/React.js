import { drawerWidth } from './variables';

const EcommerceStyles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 100,
  },
  toolBar: {
    paddingLeft: theme.spacing.unit / 2,
    paddingRight: theme.spacing.unit /2
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    maxWidth: drawerWidth,
    [theme.breakpoints.up('md')]: {
      backgroundColor: 'transparent',
      overflow: 'visible'
    },
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - 56px)',
    },
    [theme.breakpoints.up('sm')]: {
      top: '0',
      height: 'calc(100vh - 64px)'
    },
    border: 0,
    height: 'auto',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit,
    minWidth: 0,
  },
  modal: {
    [theme.breakpoints.down('sm')]: {
      top: '56px',
    },
    [theme.breakpoints.up('sm')]: {
      top: '64px',
    },
    zIndex: '1000'
  },
  backdrop: {
    [theme.breakpoints.down('sm')]: {
      top: '56px',
    },
    [theme.breakpoints.up('sm')]: {
      top: '64px',
    },
  },
  checkbox: {
    width: '24px',
    height: '24px'
  }
});

export default EcommerceStyles;