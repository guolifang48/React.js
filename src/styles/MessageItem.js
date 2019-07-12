import { fade } from '@material-ui/core/styles/colorManipulator';

const MessageItemStyles = theme => ({
  message: {
    boxShadow: '0 0 0 1px rgba(0,0,0,.05),0 1px 1px rgba(0,0,0,.05)',
    boxSizing: 'content-box',
    display: 'block',
    margin: 0,
    transition: 'box-shadow 300ms',
    overflow: 'hidden',
    '&:first-child': {
      borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`
    },
    '&:last-child': {
      borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`
    }
  },
  messageOpened: {
    boxShadow: `0 0 0 1px ${fade(theme.palette.primary.main, 0.5)}, 0 1px 1px ${fade(theme.palette.primary.main, 0.5)}`,
    boxSizing: 'content-box',
    zIndex: 1,
    position: 'relative'
  },
  header: {
    width: '100%',
    height: '65px',
    cursor: 'pointer',
    padding: `0 ${theme.spacing.unit * 2}px`,
    flexWrap: 'nowrap',
    alignItems: 'center',
    background: theme.palette.background.paper,
    '&::after': {
      content: "''",
      minHeight: 'inherit',
      fontSize: 0
    }
  },
  card: {
    background: theme.palette.background.paper,
    borderRadius: 0
  },
  button: {
    margin: `0 ${theme.spacing.unit}px`,
  }
});

export default MessageItemStyles;