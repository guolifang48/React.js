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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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

import { get_all_stores , get_all_categories, approve_store} from '../../../apis/admin';
import { getHostAddress } from '../../../apis/index';

const rows = [
	{ id: 'id', numeric: false, disablePadding: false, label: 'No' ,sorting: false},
	{ id: 'img', numeric: false, disablePadding: false, label: 'Image' ,sorting: false},
	{ id: 'store_name', numeric: false, disablePadding: false, label: 'Name',sorting: true },
	{ id: 'owner', numeric: false, disablePadding: false, label: 'Owner' ,sorting: false},
	{ id: 'category', numeric: false, disablePadding: false, label: 'Category' ,sorting: true},
	{ id: 'approved', numeric: false, disablePadding: false, label: 'Approved' ,sorting: true},
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
    const { classes, searchStore } = this.props;
    return (
      <Toolbar
        className={classNames(classes.root)}
      >
        <div className={classes.title}>
        </div>
        
        <div className={classes.searchWrapper}>
          <div>
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
  searchStore: PropTypes.func
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
		stores: [],
		page: 0,
		rowsPerPage: 5,
		isOpened: false,
		isdeleted: false,
		categories: [],
		table_title: '',
		index: 0,
		search_key: '',
		total: 0,
		snackOpen: false,
		snackError: false,
		message: '',
		img_url: '',
		storebranch:0,
		approveConfirmDialog:{
			opened:false,
			store:0,
			approved:false
		}
	};

	getAllStore = () => {
		var obj = {
			'offset': this.state.page*this.state.rowsPerPage,
			'limit': this.state.rowsPerPage,
			'sort_field': this.state.orderBy,
			'sort_dir' : this.state.order,
			'search_key' : this.state.search_key,
			'approved':this.state.storebranch
		}

		if(this.state.storebranch == 0){
			obj.approved = "all";
		}else if(this.state.storebranch == 1){
			obj.approved = "approved";
		}else{
			obj.approved = "pending";
		}

		get_all_stores(obj, (response) => {
			if (typeof(response.data) != 'undefined') { 
				var result = response.data;
				this.setState({stores: result.stores});
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
	      cate_type: 'STORE'
	    }
		get_all_categories(temp,(response) => {
			if (typeof(response.data) != 'undefined') { 
				var result = response.data;
				this.setState({categories: result.categories});
			}
		});
	}
	componentWillMount() {
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

	handleChangePage = (event, page) => {
		this.state.page = page;
		this.getAllStore();
	};

	handleChangeRowsPerPage = event => {
		this.state.rowsPerPage = event.target.value;
		this.getAllStore();
	};

	//Snackbar
	handleCloseSnackbar = () => {
		this.setState({snackOpen: false});
	}

	searchStore = (element) => {
		let str_search = element.currentTarget.value;
		this.state.search_key = str_search;
		this.getAllStore();
	}

	handleStoreBranch = (e, value)=>{
		this.setState({storebranch: value}, ()=>{
			this.getAllStore();
		});
	}


	handleCloseApproveDialog = ()=>{
		this.setState({approveConfirmDialog:{opened:false,store:0, approved:false}});
	}

	handleOKApproveDialog =()=>{

		const info = {
			store_id:this.state.approveConfirmDialog.store,
			approved:this.state.approveConfirmDialog.approved
		}

		approve_store(info, (response)=>{
				if (typeof(response.data) != 'undefined') {
					this.state.message = response.data.msg;
					if (response.data.success == true) {
						this.state.snackError = false;
					}
					else {
						this.state.snackError = true;
					}
					this.setState({snackOpen: true});
					// table reload
					this.getAllStore();
				}
		});
		
		this.setState({approveConfirmDialog:{opened:false,store:0, approved:false}});

	}

	handleApproved =(approved, store_id)=>{
		this.setState({approveConfirmDialog:{opened:true,store:store_id, approved:approved}});
	}

	renderActionButton = (store)=>{
		const approved = store.approved;
		if(approved) return (<Button variant="raised" onClick={()=>this.handleApproved(false, store.id)} color="primary">APPROVED</Button>)
		return (<Button variant="raised" onClick={()=>this.handleApproved(true, store.id)} color="secondary">PENDING</Button>)
	}
	
  render () {
		const { classes } = this.props;
	    const { stores, order, orderBy, rowsPerPage, page, isOpened , categories, total} = this.state;
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

					<StoreTableToolbar searchStore={this.searchStore} />
					<Paper square>
						<Tabs value={this.state.storebranch} onChange={this.handleStoreBranch}>
							<Tab label="ALL" />
							<Tab label="APPROVED" />
							<Tab label="PENDING" />
						</Tabs>
        	</Paper> 
					<div className = { classes.tableWrapper }>
							<Table className = { classes.table } aria-labelledby="tableTitle">
								<StoreTableHeader
									order = { order }
									orderBy = { orderBy }
									onRequestSort = { this.handleRequestSort }
									rowCount = { total }
								/>
								<TableBody>
									{stores.map((store, idx) => {
										return (
											<TableRow key={store.id}>
												<TableCell className={classes.tableCellCenter}>
												<span> 
														{ (page * rowsPerPage ) + idx + 1 } 
												</span>
												</TableCell>
												<TableCell className={classes.tableCellCenter}>
													<NavLink to={`/store/${store.id}`} className ={classes.link}>
															<img width="80" height="80" src={`${getHostAddress()}${store.store_image}`} />
													</NavLink>
												</TableCell>
												<TableCell className={classes.tableCellCenter}>
													<NavLink to={`/store/${store.id}`} className ={classes.link}>
															{ store.store_name }
													</NavLink>
												</TableCell>
												<TableCell className={classes.tableCellCenter}>
														{ store.owner.username }
												</TableCell>
												<TableCell className={classes.tableCellCenter}>
														{ (store.category)?store.category.name:"" }
												</TableCell>
												<TableCell className={classes.tableCellCenter}>
														{this.renderActionButton(store)}
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



				<Dialog
          open={this.state.approveConfirmDialog.opened}
          onClose={this.handleCloseApproveDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Warning</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">Are you sure to {(this.state.approveConfirmDialog.approved)?'Approve':'Block'} this Store?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="raised" onClick={this.handleCloseApproveDialog} color="secondary">
              Cancel
            </Button>
            <Button variant="raised" onClick={this.handleOKApproveDialog} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>


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
