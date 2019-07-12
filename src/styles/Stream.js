const StreamStyles = theme => ({
  stream: {
    padding: theme.spacing.unit,
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '8px',
      bottom: 0,
      [theme.breakpoints.down('sm')]: {
        left: '44px',
      },
      [theme.breakpoints.up('sm')]: {
        left: '51px',
      },
      width: '1px',
      backgroundColor: theme.palette.divider
    },
  },
  card: {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  content: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '74px'
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '80px'
    },
  },
});

export default StreamStyles;