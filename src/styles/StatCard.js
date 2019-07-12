const StatCardStyles = theme => ({
  content: {
    position: 'relative',
    padding: theme.spacing.unit * 2,
    '&:last-child': {
      paddingBottom: theme.spacing.unit * 2
    }
  },
  icon: {
    boxShadow: 'none',
    color: 'white'
  },
  iconFloat: {
    position: 'absolute',
    right: '15px',
    top: '50%',
    marginTop: '-20px',
    opacity: '0.2',
    transform: 'rotate(-5deg)'
  },
  lightText: {
    color: 'white'
  }
});

export default StatCardStyles;