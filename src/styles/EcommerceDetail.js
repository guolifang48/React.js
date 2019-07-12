const EcommerceDetailStyles = theme => ({
  card: {
    overflow: 'visible'
  },
  imageHeader: {
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
    },
    [theme.breakpoints.up('sm')]: {
      top: theme.spacing.unit / -2,
      left: theme.spacing.unit / -2,
      boxShadow: theme.shadows[5],
      borderRadius: theme.shape.borderRadius,
    },
    width: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top'
  },
  tabContainer: {
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
  },
  tabRoot: {
    textTransform: 'initial',
    color: theme.palette.text.primary
  },
  tabsRoot: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  inactive: {
    color: theme.palette.text.secondary
  },
  group: {
    display: 'inline-block',
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius
  },
  groupButton: {
    borderRadius: 0,
    boxShadow: 'none',
    minWidth: '40px',
    '&:first-child': {
      borderRadius: `${theme.shape.borderRadius}px 0 0 ${theme.shape.borderRadius}px`,
    },
    '&:last-child': {
      borderRadius: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
    },
  },
  optionTitle: {
    minWidth: '50px'
  }
});

export default EcommerceDetailStyles;