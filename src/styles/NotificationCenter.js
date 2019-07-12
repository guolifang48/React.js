import { notificationCenterWidth } from './variables';



const NotificationCenterStyles = theme => ({
  drawerPaper: {
    width: notificationCenterWidth,
    maxWidth: notificationCenterWidth,
    [theme.breakpoints.down('sm')]: {
      top: '56px',
      height: 'calc(100vh - 56px)',
    },
    [theme.breakpoints.up('sm')]: {
      top: '64px',
      height: 'calc(100vh - 64px)'
    },
    zIndex: theme.zIndex.drawer + 99,
  },
  modal: {
    [theme.breakpoints.down('sm')]: {
      top: '56px',
    },
    [theme.breakpoints.up('sm')]: {
      top: '64px',
    },
    zIndex: theme.zIndex.drawer + 99
  },
  backdrop: {
    [theme.breakpoints.down('sm')]: {
      top: '56px',
    },
    [theme.breakpoints.up('sm')]: {
      top: '64px',
    },
  },
  container: {
    position: 'relative',
    overflowX: 'hidden',
    overflowY: 'auto',
    zIndex: 1,
    flexGrow: 1,
  },
  tabsRoot: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: '50%',
    color: theme.palette.text.primary
  },
  padding: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
  },
  seeAllWrapper: {
    width: '100%',
    textAlign: 'center',
    borderBottom: `1px solid #ddd`,
    paddingTop: '15px',
    paddingBottom: '15px',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)'
    }
  }
});

export default NotificationCenterStyles;