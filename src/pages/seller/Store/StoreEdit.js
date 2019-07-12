import React from 'react';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Wrapper } from '../../../components';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { mockOwner } from '../../../utils/mock';
import { connect } from 'react-redux';

import { get_store , get_category, uploadfile } from '../../../apis';

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});
const styles = theme => ({
  root: {
    width: '120%',
    marginTop: theme.spacing.unit * 5,
    
  },
  table: {
    minWidth: 1020,
  },
  button: {
    
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  tableWrapper: {
    width:'95%',
    overflowX: 'auto',
    margin:'11px',
    
  },
  input: {
    display: 'none',
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
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
// made by somi
const image = {
  url: '/static/images/unsplash/1.jpg',
  title: 'Upload',
  width: '40%',
};
class Store extends React.Component {
  showDetail = false;
  dialog_state = {
    open: false,
  };
  state = {
    data: [],
    categories: [],
    owner_list: mockOwner,
    selectedId: 0,
    selectedName: '',//made by somi
    selectedDescription: '',
    selectedOwner: 0,
    selectedCategeory: 0,
    selectedReviews:0,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    var store, category = [];
    get_store((response) => {
      store = response.data;
       console.log(store);
      this.setState({
        data: store
      });
      this.state.data.map (sel => {
        this.setState({selectedDescription: sel.description});
        this.setState({selectedName: sel.store_name});
        this.setState({selectedCategeory: sel.category.id});
        this.setState({selectedOwner: sel.owner.id});         
      });
    })
    get_category((response) => {
      category = response.data;
      this.setState({
        categories: category
      });
    })
    
  }
  Edithandle = (data) => { 
    console.log(data);
  };
  handleChange_Categories = event => {
    this.setState({selectedCategeory: event.target.value});
  };
  handleChange_owner = event => {
    this.setState({selectedOwner: event.target.value});
  }
  handleNamechanged = event => {
    this.setState({selectedName: event.target.value});
  }
  handleDeschanged = event => {
    this.setState({selectedDescription: event.target.value});
  }
  handleReviewschanged = event => {
    this.setState({selectedReviews: event.target.value});
  }
  uploadFile = (event) => {
    console.log("file = " + event.target.files[0]);
    let file = event.target.files[0];
    let form_data = new FormData();
    form_data.append('file', file);  // this is upload file -------- 

    uploadfile(form_data, (response) => {
      var data = response.data;
      console.log("error");
      // if (data.success) {
      //   console.log("ok");
      // } else {
      //   console.log("error");
      // }
    })
  }
  render() {
    const { classes } = this.props;
    const { data , categories , owner_list} = this.state;
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={1} md={3}>
            </Grid>
            <Grid item xs={12} sm={8} md={6}>
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                      <div className = "store-edit">
                        <div className ="add-store-item-wrapper">
                          <span className="add-store-item-left">Name :</span>
                          <TextField autoFocus
                                     margin = "normal"
                                     id = "name"
                                     className = "add-store-item-right mt_5"                                     
                                     value = {this.state.selectedName}
                                     onChange = {this.handleNamechanged}
                                     fullWidth
                          />
                        </div>
                        <div className="add-store-item-wrapper">
                          <span className="add-store-item-left">Categories :</span>
                          <Select value={this.state.selectedCategeory}
                                  onChange={this.handleChange_Categories}
                                  className = "add-store-item-right"
                                  fullWidth
                          >
                            {categories.map(n => (
                              <MenuItem
                                key={n.id}
                                value={n.id}
                              >
                                {n.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </div>
                        <div className="add-store-item-wrapper">
                          <span className="add-store-item-left">Owner :</span>
                          <Select value={this.state.selectedOwner}
                                  onChange={this.handleChange_owner}
                                  className = "add-store-item-right"
                                  fullWidth
                          >
                          {owner_list.map(n => (
                              <MenuItem
                                key={n.id}
                                value={n.id}
                              >
                                {n.username}
                              </MenuItem>
                            ))}
                          </Select>
                        </div>
                        <div className ="add-store-item-wrapper">
                          <span className="add-store-item-left">Description :</span>
                          <TextField id = "textarea"
                                      label = ""
                                      placeholder = ""
                                      multiline
                                      className = "add-store-item-right mt_5"
                                      margin = "normal"
                                      value = {this.state.selectedDescription}
                                      onChange = {this.handleDeschanged}
                                      fullWidth
                          />
                        </div>
                        <div className= "add-store-item-wrapper">
                          <span className="add-store-item-left">Upload :</span>
                          <div className ="add-store-item-right">
                            <input 
                              accept="image/*" 
                              className={classes.input} 
                              id="file-input-button" 
                              type="file" 
                              onChange = {this.uploadFile}/>
                              <label htmlFor="file-input-button">
                                <Button variant="contained" color="default" component="span" className={classes.button}>
                                  Upload
                                  <CloudUploadIcon className={classes.rightIcon} />
                                </Button>
                              </label>
                          </div>
                        </div>
                        <Button className="store-btn" variant="raised" color="primary" type="submit" onClick={() => this.Edithandle()} >Create</Button>
                      </div>
                    </div>  
                </Paper>
            </Grid>
            <Grid item xs={12} sm={2} md={3}>
            </Grid>
        </Grid>        
        
        
    );
  }
}

Store.propTypes = {
  classes: PropTypes.object.isRequired,
  userInfo: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return  {
    userinfo: state.auth.userinfo
  };
}

export default connect(mapStateToProps, null)(withStyles(styles)(Store));
