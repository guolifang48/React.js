const SessionStyles = theme => ({
  card: {
    overflow: 'visible'
  },
  session: {
    position: 'relative',
    zIndex: 4000,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  background: {
    backgroundColor: theme.palette.primary.main
  },
  content: {
    padding: `40px ${theme.spacing.unit}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1 0 auto',
    flexDirection: 'column',
    minHeight: '100%',
    textAlign: 'center'
  },
  wrapper: {
    flex: 'none',
    maxWidth: '400px',
    width: '100%',
    margin: '0 auto'
  },
  avatar: {
    position: 'relative',
    display: 'block',
    margin: '-75px auto 0'
  },
  lockscreenWrapper: {
    flex: 'none',
    maxWidth: '280px',
    width: '100%',
    margin: '0 auto',
  },
  title: {
    fontSize: '150px',
    lineHeight: 1.2,
    fontWeight: 100,
    display: 'inline-table',
    position: 'relative',
    background: theme.palette.primary.main,
    color: '#fff',
    padding: `0 ${theme.spacing.unit * 3}px`,
    borderRadius: '60px',
    cursor: 'pointer',
    margin: `0 0 ${theme.spacing.unit}px`,
    '&:after': {
      top: '100%',
      left: '50%',
      border: 'solid transparent',
      content: '""',
      height: 0,
      width: 0,
      position: 'absolute',
      pointerEvents: 'none',
      borderColor: 'rgba(0, 0, 0, 0)',
      borderTopColor: theme.palette.primary.main,
      borderWidth: '8px',
      marginLeft: '-8px'
    }
  },
  subtitle: {
    fontSize: '32px',
    fontWeight: 900
  },
  fullWidth: {
    width: '100%'
  }
});

export default SessionStyles;