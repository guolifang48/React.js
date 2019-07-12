import { fade } from '@material-ui/core/styles/colorManipulator';

const WidgetStyles = theme => ({
  media: {
    height: 0
  },
  actions: {
    display: 'flex'
  },
  content: {
    paddingBottom: theme.spacing.unit * 2
  },
  center: {
    textAlign: 'center'
  },
  avatar: {
    width: '100%',
    height: '100%',
    maxWidth: 105,
    marginBottom: theme.spacing.unit * 2
  },
  flip: {
    transform: 'rotate(-90deg)'
  },
  weatherBackground: {
    backgroundColor: theme.palette.primary.main
  },
  weatherDetails: {
    color: theme.palette.primary.contrastText
  },
  weatherIcon: {
    fontSize: 26
  },
  textEllipsis: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'pre'
  },
  clamp: {
    position: 'relative',
    height: '4.5em',
    overflow: 'hidden',
    '&:after': {
      content: '""',
      textAlign: 'right',
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: '40%',
      height: '1.5em',
      background: `linear-gradient(to right, ${fade(theme.palette.background.paper, 0)}, ${theme.palette.background.paper} 50%)`,
    }
  }
});

export default WidgetStyles;