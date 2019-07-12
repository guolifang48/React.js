import { infoColor, warningColor } from './variables';

const TimelineStyles = theme => ({
  timeline: {
    '&::before': {
      position: 'absolute',
      top: '6px',
      width: '4px',
      height: '100%',
      content: '""',
      backgroundColor: theme.palette.background.paper,
      left: '4px',
      [theme.breakpoints.up('lg')]: {
        left: '50%',
        marginLeft: '-2px'
      }
    },
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing.unit * 2
    },
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing.unit * 3
    },
  },
  icon: {
    position: 'absolute',
    top: '15px',
    width: '12px',
    height: '12px',
    textAlign: 'center',
    borderRadius: '50%',
    left: '0',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '2px',
      left: '2px',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: theme.palette.background.paper,
    },
    [theme.breakpoints.up('lg')]: {
      left: '50%',
      marginLeft: '-6px'
    }
  },
  card: {
    position: 'relative',
    margin: '40px 0',
    '&::after': {
      content: '""',
      display: 'table',
      clear: 'both',
    },
    '&:first-child': {
      marginTop: 0,
    },
  },
  content: {
    position: 'relative',
    marginLeft: '30px',
    '&::after': {
      content: '""',
      display: 'table',
      clear: 'both',
    },
    [theme.breakpoints.up('lg')]: {
      width: '47%',
      marginLeft: 0
    },
    [theme.breakpoints.down('md')]: {
      marginleft: '30px'
    }
  },
  body: {
    float: 'left',
    display: 'inline-block',
    margin: 0,
    padding: '16px',
    '&::before': {
      position: 'absolute',
      top: '11px',
      width: 0,
      height: 0,
      content: '""',
      pointerEvents: 'none',
      borderWidth: '10px',
      borderStyle: 'solid',
      right: '100%',
      borderColor: `transparent ${theme.palette.divider} transparent transparent`
    },
    '&::after': {
      position: 'absolute',
      top: '12px',
      width: 0,
      height: 0,
      content: '""',
      pointerEvents: 'none',
      borderWidth: '9px',
      borderStyle: 'solid',
      right: '100%',
      borderColor: `transparent ${theme.palette.background.paper} transparent transparent`
    },
    [theme.breakpoints.down('md')]: {
      float: 'left',
      marginBottom: 0
    }
  },
  date: {
    display: 'inline-block',
    padding: '4px 0 10px',
    [theme.breakpoints.up('lg')]: {
      position: 'absolute',
      top: '7px',
      width: '100%',
      left: '112%',
    },
    [theme.breakpoints.down('md')]: {
      position: 'relative',
      top: 0,
      width: '100%',
      left: 'auto'
    }
  },
  contentOdd: {
    [theme.breakpoints.up('lg')]: {
      float: 'right'
    }
  },
  dateOdd: {
    [theme.breakpoints.up('lg')]: {
      right: '112%',
      left: 'auto',
      textAlign: 'right'
    }
  },
  contentEven: {
    [theme.breakpoints.up('lg')]: {
      float: 'left'
    }
  },
  bodyEven: {
    [theme.breakpoints.up('lg')]: {
      float: 'right',
      '&::before': {
        position: 'absolute',
        right: 'auto',
        left: '100%',
        borderColor: `transparent transparent transparent ${theme.palette.divider}`,
      },
      '&::after': {
        position: 'absolute',
        right: 'auto',
        left: '100%',
        borderColor: `transparent transparent transparent ${theme.palette.background.paper}`
      }
    }
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
  },
  success: {
    backgroundColor: theme.palette.secondary.main,
  },
  info: {
    backgroundColor: infoColor,
  },
  warning: {
    backgroundColor: warningColor,
  },
  danger: {
    backgroundColor: theme.palette.error.main,
  }
});

export default TimelineStyles;