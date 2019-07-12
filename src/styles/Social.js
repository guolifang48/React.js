const SocialStyles = theme => ({
  avatar: {
    display: 'inline-block',
    margin: 0,
    [theme.breakpoints.up('sm')]: {
      width: 128,
      height: 128,
    },
    [theme.breakpoints.down('xs')]: {
      width: 64,
      height: 64,
    },
    marginBottom: theme.spacing.unit
  },
  tabRoot: {
    textTransform: 'initial',
    color: theme.palette.text.primary
  },
  postInput: {
    border: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing.unit * 3,
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing.unit * 2,
    },
    fontSize: '13px',
    outline: 0,
    backgroundColor: theme.palette.background.paper,
  },
  input:{
    display: 'none'
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      '& $imageBackdrop': {
        opacity: 0.5,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $button' : {
        opacity:0
      }
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

export default SocialStyles;