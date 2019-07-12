import React from 'react';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Wrapper } from '../../../components';
import { withStyles } from '@material-ui/core/styles';
import { Redirect ,NavLink} from 'react-router-dom';
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
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SearchIcon from '@material-ui/icons/Search';
import ButtonBase from '@material-ui/core/ButtonBase';

import { connect } from 'react-redux';

import { CustomSnack } from '../../../components';
import Snackbar from "@material-ui/core/Snackbar";

import { get_all_store ,get_store_category , edit_store , add_store , delete_store_by_id} from '../../../apis/seller';
import { getHostAddress } from '../../../apis/index';

const rows = [
	{ id: 'id', numeric: false, disablePadding: false, label: 'No' ,sorting: false},
	{ id: 'store_name', numeric: false, disablePadding: false, label: 'Name',sorting: true },
	{ id: 'img', numeric: false, disablePadding: false, label: 'Image' ,sorting: false},
	{ id: 'category', numeric: false, disablePadding: false, label: 'Category' ,sorting: true},
	{ id: 'owner', numeric: false, disablePadding: false, label: 'Owner' ,sorting: false},
	{ id: 'action', numeric: false, disablePadding: false, label: 'Action' ,sorting: false}
];	

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
  searchWrapper: {
    flex: '1 1 0%',
    boxSizing:' border-box'
  },
  searchForm: {
    background: 'white',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing.unit * 2,
    display: 'block',
    float: 'left'
  },
  searchInput: {
    fontSize: '1rem',
    padding: theme.spacing.unit * 1.9,
    cursor: 'text',
    textIndent: '30px',
    background: 'transparent',
    outline: '0',
    border: '1px solid #ddd',
    borderRadius: "5px"
  },
  searchIcon: {
    position: 'absolute',
    top: '50%',
    left: '0',
    marginTop: '-24px',
    color: 'rgba(0,0,0,.87)'
  },
});
// made by somi

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#3f51b5',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class StoreTableToolbar extends React.Component {

  render() {
    const { classes, searchStore, addStore } = this.props;
    return (
      <Toolbar
        className={classNames(classes.root)}
      >
        <div className={classes.title}>
        </div>
        
        <div className={classes.searchWrapper}>
          <div>
            <div className = "add-button">
              <Button variant="raised" color="secondary" fullWidth type="submit" onClick={() => this.props.addStore()}>Add</Button>
            </div>
            <form className={classes.searchForm}>
              <IconButton
                aria-label="Search"
                className={classes.searchIcon}
              >
                <SearchIcon />
              </IconButton>
              <input className={classes.searchInput} type="text" placeholder="Search" autoFocus={true} onChange={(e) => this.props.searchStore(e)} />
            </form>
          </div>
        </div>
      </Toolbar>
    );
  }
};

StoreTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  searchStore: PropTypes.func,
  addStore: PropTypes.func,
};

StoreTableToolbar = withStyles(toolbarStyles)(StoreTableToolbar);

class StoreTableHeader extends React.Component {
	createSortHandler = property => event => {
    if (property.sorting == false){
      return;
    }
    this.props.onRequestSort(event, property.id);
  };
	render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, classes } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            return (
              <CustomTableCell
                key={row.id}
                numeric={row.numeric}
                className={row.numeric ? (row.sorting ? 'sorting' : undefined) : (row.sorting ? 'sorting table-head' : 'table-head')}
                onClick={this.createSortHandler(row)}
              >
                    {row.label}
              </CustomTableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

StoreTableHeader.propTypes = {
	onRequestSort: PropTypes.func.isRequired,
	order: PropTypes.string.isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired
}
const styles = theme => ({
	root: {
		width: '100%',
	},
	table: {
		minWidth: 1020,
	},
	tableWrapper: {
    	overflowX: 'auto',
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
	tableCellCenter: {
    textAlign:"center"
  },
  link: {
    color: "#3f51b5"
  },
});


var file_name = '';
class StoreTable extends React.Component {

	getInitialState() {
		return {selected_img: ''};
	}

	constructor(props) {
		super(props);
	}
	state = {
		order: 'asc',
		orderBy: 'id',
		store_data: [],
		page: 0,
		rowsPerPage: 5,
		isOpened: false,
		isdelected: false,

		selected_description: '',
		
		categories: [],
		users: [],
		selected_id:0,
		selected_name: '',
		selected_category: 0,
		selected_owner: '',
		
		selected_file: null,
		table_title: '',
		index: 0,
		search_key: '',
		total: 0,
		snackOpen: false,
    	snackError: false,
   		message: '',
		img_url: ''
	};

	getAllStore = () => {
		var obj = {
			'offset': this.state.page * this.state.rowsPerPage,
			'limit': this.state.rowsPerPage,
			'sort_field': this.state.orderBy,
			'sort_dir' : this.state.order,
			'search_key' : this.state.search_key,
			'user_id': this.props.userinfo.userid
		}
		
		get_all_store(obj, (response) => {
			if (typeof(response.data) != 'undefined') { 
				var result = response.data;
				console.log(result);
				this.setState({store_data: result.stores});
				this.setState({total: result.total});
			}
		});
	}
	getAllCategory = () => {
		let temp = {
	      search_key: '',
	      sort_field: 'id',
	      sort_dir: 'asc',
	      offset: 0,
	      limit: 10000, //made by somi
	    }
		get_store_category(temp,(response) => {
			if (typeof(response.data) != 'undefined') { 
				var result = response.data;
				this.setState({categories: result});
			}
		});
	}
	componentWillMount() {
		var category, store, user = [];
		this.getAllStore();
		this.getAllCategory();
	}

	handleRequestSort = (event, property) => {
		const orderBy = property;
		if (orderBy == 'img' || orderBy == 'owner' || orderBy == 'action' || orderBy == 'id')
			return;
		let order = 'desc';
		if (this.state.orderBy === property && this.state.order === 'desc') {
			order = 'asc';
		}
		this.state.order = order;
		this.state.orderBy = orderBy;
		this.getAllStore();
	};

	Edithandle = (data) => {

		var store_url = getHostAddress() + data.store.store_image;
		
		this.setState({ isOpened: true ,
										selected_id: data.store.id ,
										selected_name: data.store.store_name ,
										selected_category: data.store.category.id,
										selected_owner: data.store.owner.username, 
										selected_description: data.store.description,
										table_title: 'Edit',
										img_url:store_url
									});
	};
	handleClose = () => {
		this.setState({ img_url: ''});
		this.setState({ isOpened: false });
	};
	DeleteDialogClose = () => {
		this.setState({isdelected: false});
	}
	DeleteDialogAccept = () => {
		this.setState({isdelected: false});
		delete_store_by_id({store_id:this.state.selected_id}, (response) => {
			var result = response.data;
			if(result){
				this.setState({message: result.msg});
				if(result.success) {
					this.setState({snackError: false});
					this.getAllStore();//refresh
				}
				this.setState({snackOpen: true});
			}
		});
	}
	Deletehandle = (id) => {
		this.setState({selected_id: id});
		this.setState({isdelected: true});
	};

	handleChangePage = (event, page) => {
		this.state.page = page;
		this.getAllStore();
	};

	handleChangeRowsPerPage = event => {
		this.state.rowsPerPage = event.target.value;
		this.getAllStore();
	};
	addOrEditStore = (e) => {
		var checked = true;
		if(this.state.selected_name == '' || this.state.selected_description == '') { // Check validation with required.
			checked = false;
			return;
		}
		if (this.state.img_url == '') {
			e.preventDefault();
			checked = false;
			this.setState({snackError: true});
			this.setState({snackOpen: true});
			this.setState({message: 'please select your store logo'});
			return;
		}
		if (this.state.selected_category == 0) {
			e.preventDefault();
			checked = false;
			this.setState({snackError: true});
			this.setState({snackOpen: true});
			this.setState({message: 'please select category'});
			return;
		}
		if(checked) {
			e.preventDefault();
			this.setState({ isOpened: false });
			if (this.state.table_title == "Edit") {
				var obj = {
					'id': this.state.selected_id,
					'store_name': this.state.selected_name,
					'category': this.state.selected_category,
					'owner': this.props.userinfo.userid,
					'description': this.state.selected_description,
					'store_image': this.state.selected_file
				}

				edit_store(obj,(response) => {
					var result = response.data;
					if (response.data !== undefined) {
						this.setState({message: result.msg});
						if (result.success) {
							this.setState({snackError: false});
							this.getAllStore();//refresh
						} else {
							this.setState({snackError: true});
						}
					}
					this.setState({snackOpen: true});
				});
			}
			else if (this.state.table_title == "Add") 
			{
				var obj = {
					'store_name': this.state.selected_name,
					'category': this.state.selected_category,
					'description': this.state.selected_description,
					'store_image': this.state.selected_file,
					'owner': this.props.userinfo.userid
				}

				console.log(obj);
				add_store(obj,(response) => {
					console.log(response);
					var result = response.data;
					if (response.data !== undefined) {
						this.setState({message: result.msg});
						if (result.success) {
							this.setState({snackError: false});
							this.getAllStore();//refresh
						} else {
							this.setState({snackError: true});
						}
					}
				});

				this.setState({snackOpen: true});

			}
		}
	}
	handleStoreName = event => {
		this.setState({selected_name: event.target.value});
	}
	handleCategory = event => {
		console.log(event.target);
		this.setState({selected_category: event.target.value});
	};
	handleOwner = event => {
		this.setState({selected_owner: event.target.value});
	}
	handleDescription = event => {
		this.setState({selected_description: event.target.value});
	}
	AddHandle = event => {
		this.setState({isOpened : true});
		this.setState({selected_name: ""});
		this.setState({selected_category: 0});
		this.setState({selected_owner: 0});
		this.setState({selected_description: ""});
		this.setState({img_url: ''});
		this.setState({ table_title: 'Add' });
	}
	//file upload
	
	onChangePicture = event => {
		var file = event.target.files[0];
		if (file) {
	      this.setState({selected_file: file});
	      this.setState({img_url: URL.createObjectURL(file)});
	    }
	}
	//Snackbar
	handleCloseSnackbar = () => {
		this.setState({snackOpen: false});
	}

	//made by somi
    getStore = (index, limit) => { 
		var aryTmp = this.tmp.arr;
		let tmp = [];
		for (let i = 0; i < aryTmp.length ; i++) {
			if (this.props.userinfo.userid == aryTmp[i].owner.id) {
				tmp.push(aryTmp[i]);
			}
		}
		this.setState({store_data: tmp});
		this.setState({search_key: ''});
	}	
    searchStore = (element) => {
		let str_search = element.currentTarget.value;
		this.state.search_key = str_search;
		this.getAllStore();
 	}

    render () {
		console.log(this.state.selected_category);
		const { classes } = this.props;
	    const { store_data, order, orderBy, rowsPerPage, page,isOpened , categories, users , total} = this.state;
	    return (
	    <div>
          <Paper className = { classes.root }>
					<Snackbar
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						open={this.state.snackOpen}
						autoHideDuration={6000}
						onClose={this.handleCloseSnackbar}
						>
						<CustomSnack
							onClose={this.handleCloseSnackbar}
							variant={this.state.snackError == false ? 'success' : 'error'}
							message={this.state.message}
					/>
					</Snackbar>
					<StoreTableToolbar searchStore={this.searchStore} addStore = {this.AddHandle}/>
        			<div className = { classes.tableWrapper }>
							
    				<Dialog open={this.state.isOpened}
							onClose={this.handleClose}
							aria-labelledby="form-dialog-title" fullWidth>
							<form>
								<DialogTitle id="form-dialog-title">{this.state.table_title}</DialogTitle>
								<DialogContent>
									<FormGroup className={classes.formGroup}>
										<FormControl className={classes.formControl} fullWidth>
											<div className ="add-store-item-wrapper">
												<span className="add-store-item-left" >Name* :</span>
												<TextField autoFocus
														placeholder = "Input the store name"
														margin = "normal"
														id = "name"
														className = "add-store-item-right no-margin"
														value = {this.state.selected_name}
														onChange = {this.handleStoreName}
														fullWidth
														required = {true}
												/>
											</div>
										</FormControl>
									</FormGroup>
									<FormGroup className={classes.formGroup}>
										<FormControl className={classes.formControl} fullWidth>
											<div className ="add-store-item-wrapper">
												<span className="add-store-img-item-left">Store logo* :</span>
												<div className="row">
													<input accept="image" className={classes.input} id="icon-button-file" type="file" onChange = {this.onChangePicture}/>
													<label htmlFor="icon-button-file">
														<ButtonBase
														focusRipple
														key={this.state.selected_id}
														className={classes.image}
														focusVisibleClassName={classes.focusVisible}
														component="div"
														required = {true}
														style={{
															width: '200px',
															height: '200px',
															border: '1px solid rgb(179, 179, 179)'
														}}
														>
														<span
															className={classes.imageSrc}
															style={{
																backgroundImage: `url(${this.state.img_url})`,
															}}
														/>
														</ButtonBase>
													</label>
												</div>
											</div>
										</FormControl>
									</FormGroup>
									<FormGroup className={classes.formGroup}>
										<FormControl className={classes.formControl} fullWidth>
											<div className="add-store-item-wrapper">
												<span className="add-store-item-left">Categories*:</span>
												<Select
													placeholder = "Select the category"
													value={this.state.selected_category}
													onChange={this.handleCategory}
													className="add-store-item-right no-margin"
													
													required = {true}
													>
													<MenuItem
														key='0'
														value='0'
													>
													Please select category
													</MenuItem>
														{categories.map(n => (
																										<MenuItem
																												key={n.id}
																												value={n.id}
																										>{n.name}</MenuItem>
						                                  ))}
												</Select>
											</div>
										</FormControl>
									</FormGroup>
									<FormGroup className={classes.formGroup}>
										<FormControl className={classes.formControl} fullWidth>
											<div className="add-store-item-wrapper">
												<span className="add-store-item-left">Description :</span>
												<TextField id="textarea"
													label=""
													placeholder = "Input the store description"
													multiline
													className="add-store-item-right no-margin"
													margin="normal"
													value = {this.state.selected_description}
													onChange={this.handleDescription}
													fullWidth
													required = {true}
												/>
											</div>
										</FormControl>
									</FormGroup>
							    </DialogContent>
								<DialogActions>
									<Button onClick={this.handleClose} color="secondary"> Cancel </Button>
									<Button type="submit" onClick={(el) => { this.addOrEditStore(el) }} color="primary"> {this.state.table_title} </Button>
								</DialogActions>
							</form>
						</Dialog>

						<Dialog
							open={this.state.isdelected}
							aria-labelledby="responsive-dialog-title"
							>
							<DialogTitle id="responsive-dialog-title">WARNING!!!</DialogTitle>
							<DialogContent>
								<DialogContentText>
									 It will be not use after. Do you want to delete it?
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button onClick={this.DeleteDialogAccept}  variant="raised" color="primary">
								Ok
								</Button>
								<Button onClick={this.DeleteDialogClose} variant="raised" color="secondary">
								Cancel
								</Button>
							</DialogActions>
						</Dialog>

						<Table className = { classes.table } aria-labelledby="tableTitle">
							<StoreTableHeader
								order = { order }
								orderBy = { orderBy }
								onRequestSort = { this.handleRequestSort }
								rowCount = { total }
							/>
							<TableBody>
								{store_data.map((store, idx) => {
									return (
										<TableRow key={store.id}>
											<TableCell className={classes.tableCellCenter}>
											<span> 
													{ (page * rowsPerPage ) + idx + 1 } 
											</span>
											</TableCell>
											<TableCell className={classes.tableCellCenter}>
												<NavLink to={`/store/${store.id}`} className ={classes.link}>
														{ store.store_name }
												</NavLink>
											</TableCell>
											<TableCell className={classes.tableCellCenter}>
												<NavLink to={`/store/${store.id}`} className ={classes.link}>
														<img width="80" height="80" src={`${getHostAddress()}${store.store_image}`} />
												</NavLink>
											</TableCell>
											<TableCell className={classes.tableCellCenter}>
													{ (store.category)?store.category.name:"" }
											</TableCell>
											<TableCell className={classes.tableCellCenter}>
													{ this.props.userinfo.username }
											</TableCell>
											<TableCell className={classes.tableCellCenter}>
												{store.Action}
												<div className = "store-button-cell">
													<Button variant="raised" color="primary" fullWidth type="submit" onClick={() => this.Edithandle({store})}>Edit</Button>&nbsp;&nbsp;
													<Button variant="raised" color="secondary" fullWidth type="submit" onClick={() => this.Deletehandle(store.id)}>Delete</Button>
												</div>
											</TableCell>
										</TableRow>
									);
                				})}
        					</TableBody>
        				</Table>
        			</div>
					<TablePagination
						component = "div"
						count = { total }
						rowsPerPage = { rowsPerPage }
						page = { page }
						backIconButtonProps = {{ 'aria-label': 'Previous Page' }}
						nextIconButtonProps = {{ 'aria-label': 'Next Page' }}
						onChangePage = { this.handleChangePage }
						onChangeRowsPerPage = { this.handleChangeRowsPerPage }
					/>
				</Paper>
			</div>
	    );
	}
}

StoreTable.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = state => {
	return  {
		userinfo: state.auth.userinfo
	};
}
export default connect(mapStateToProps, null)(withStyles(styles)(StoreTable));
