import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Redirect , NavLink} from 'react-router-dom';
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
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import InputLabel from '@material-ui/core/InputLabel';
import { connect } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import ButtonBase from '@material-ui/core/ButtonBase';
import { CustomSnack } from '../../../components';
import Snackbar from "@material-ui/core/Snackbar";
import Grid from '@material-ui/core/Grid';
import { get_product_category, get_all_product , get_all_store , update_product_by_id , add_product , delete_product_by_id, get_store_sub_category} from '../../../apis/seller';
import { getHostAddress } from '../../../apis/index';

const rows = [
  { id: 'id', numeric: false, disablePadding: false, label: 'No' ,sorting: false},
  { id: 'img', numeric: false, disablePadding: false, label: 'Image' ,sorting: true},
  { id: 'product_name', numeric: false, disablePadding: false, label: 'Name' ,sorting: false},
  { id: 'category', numeric: false, disablePadding: false, label: 'Category' ,sorting: true},
  { id: 'store_name', numeric: false, disablePadding: false, label: 'Store' ,sorting: true},
  { id: 'cost', numeric: true, disablePadding: false, label: 'Price' ,sorting: true},
  { id: 'action', numeric: false, disablePadding: false, label: 'Action' ,sorting: false},
];

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#3f51b5',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class ProductHead extends React.Component {
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
ProductHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

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
  Select: {
    width: '150px',
    marginTop: '15px'
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
  }
});
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
  input: {
    display: 'none'
  },
  tableCellCenter: {
    textAlign:"center"
  },
  link: {
    color: "#3f51b5"
  },
});

// made by somi
class ProductTableToolbar extends React.Component {

  render() {
    const { classes, searchProduct, addProduct ,categories, selectedCategory , searchProductByCategories} = this.props;
    return (
      <Toolbar
        className={classNames(classes.root)}
      >
        <div className={classes.title}>
        </div>
        
        <div className={classes.searchWrapper}>
          <div>
            <div className = "add-button">
              <Button variant="raised" color="secondary" fullWidth type="submit" onClick={() => this.props.addProduct()}>Add</Button>
            </div>
            
            <form className={classes.searchForm}>
              <IconButton
                aria-label="Search"
                className={classes.searchIcon}
              >
                <SearchIcon />
              </IconButton>
              <input className={classes.searchInput} type="text" placeholder="Search" autoFocus={true} onChange={(e) => this.props.searchProduct(e)} />
            </form>

            <form className={classes.searchForm}>
              <div>
                <span className="add-store-item-left">Categories :</span>
                <Select
                    value={this.props.selectedCategory}
                    onChange={this.props.searchProductByCategories}
                    className={classes.Select}
                >
                <MenuItem
                    key='0'
                    value='0'
                >
                All
                </MenuItem>
                  {this.props.categories.map(n => (
                    (n.parent===null
                      ? <MenuItem
                          key={n.id}
                          value={n.id}
                          disabled={true}
                      >{n.name}</MenuItem>
                      : <MenuItem key={n.id} value={n.id} style={{marginLeft: '20px'}}>{n.name}</MenuItem>
                    )
                  ))}
                </Select>
              </div>
            </form>
          </div>
        </div>
      </Toolbar>
    );
  }
};

ProductTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  searchProduct: PropTypes.func,
  addProduct: PropTypes.func,
  searchProductByCategories: PropTypes.func,
  selectedCategory: PropTypes.number.isRequired,
  categories: PropTypes.array.isRequired
};

ProductTableToolbar = withStyles(toolbarStyles)(ProductTableToolbar);


class ProductTable extends React.Component {
  showDetail = false;
  constructor(props) {
    super(props);
  }
  //
  state = {
    order: 'asc',
    orderBy: 'id',
    data: [],
    page: 0,
    rowsPerPage: 5,
    isOpened: false,
    categories: [],
    store_list: [],
    selected_id: 0,
    selected_name: '',//made by somi
    selected_des: '',
    selected_storeid: 0,
    selected_category: 0,
    selected_cost: 0,
    selected_amount: 0,
    selected_like_count: 0,
    selected_following: 0,
    selected_file: null,
    table_title: '',
    search_key: '',
    searchCategory: 0,
    isdeleted: false,
    total: 0,
    snackOpen: false,
    snackError: false,
    message: '',
    photo_url: ''
  };
  componentWillMount() {
    this.getAllProduct();
    this.get_all_my_stores();
  }

  get_all_my_stores(){
    var obj = {
			'offset': 0,
			'limit': 1000,
			'sort_field': 'created',
			'sort_dir' : 'desc',
			'search_key' : '',
			'user_id': this.props.userinfo.userid
    }

		get_all_store(obj, (response) => {
      console.log(response);
      if (response.data != undefined) {
        var result = response.data;
			  this.setState({store_list: result.stores});
      }
    });
    
  }

  getAllProduct = () => {
    var obj = {
      'user_id': this.props.userinfo.userid,
      'offset': this.state.page * this.state.rowsPerPage,
      'limit': this.state.rowsPerPage,
      'search_key': this.state.search_key,
      'sort_field': this.state.orderBy,
      'sort_dir': this.state.order,
      'search_category': this.state.searchCategory
    }
    get_all_product(obj, (response) => {
      if (typeof(response.data) != 'undefined') { 
        var result = response.data;
        this.setState({data: result.products});
        this.setState({total: result.total});
      }
    });
  }

  searchProduct = (element) => {
    let str_search = element.currentTarget.value;
    this.state.search_key = str_search;
    this.setState({search_key:str_search}, ()=>{
      this.getAllProduct();
    });
    
  }
  

  handleRequestSort = (event, property) => {
    const orderBy = property;
    if (orderBy == 'img' || orderBy == 'action' || orderBy == 'id')
      return;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.state.orderBy = orderBy;
    this.state.order = order;
    this.getAllProduct();
  };

  handleEditAction = (data) => {
    
    this.setState({ isOpened: true,
                    selected_id: data.n.id,
                    selected_name: data.n.product_name,
                    selected_storeid: data.n.store.id,
                    selected_cost: data.n.cost,
                    selected_amount: data.n.amount,
                    photo_url: data.n.photo_url,
                    img_url:`${getHostAddress()}${data.n.photo_url}`,
                    table_title: 'Edit',
                    selected_des: data.n.description,
                    selected_category: data.n.category.id,
                    categories:data.n.store.category.children
                  });
  };
  handleClose = () => {
    this.setState({img_url : ''});
    this.setState({ isOpened: false });
  };
  Deletehandle = (id) => {
    this.setState({selected_id: id});
    this.setState({isdeleted: true});
  };

  handleChangePage = (event, page) => {
    this.state.page = page;
    this.getAllProduct();
  };

  handleChangeRowsPerPage = event => {
    this.state.rowsPerPage = event.target.value;
    this.getAllProduct();
  };
  addOrEditProduct = (e) => {
    var checked = true;
    if(this.state.selected_name == '' || this.state.selected_cost == '' || this.state.selected_amount == '' || this.state.selected_des == '') {
      checked = false;
      return;
    } 
    if(this.state.img_url == '') {
      e.preventDefault();
      checked = false;
      this.setState({snackError: true});
      this.setState({snackOpen: true});
      this.setState({message: 'please select your product image.'});
      return;
    } 
    if(this.state.selected_category == '') {
      e.preventDefault();
      checked = false;
      this.setState({snackError: true});
      this.setState({snackOpen: true});
      this.setState({message: 'please select product category.'});
      return;
    } 
    if(this.state.selected_storeid == '') {
      e.preventDefault();
      checked = false;
      this.setState({snackError: true});
      this.setState({snackOpen: true});
      this.setState({message: 'please select store name.'});
      return;
    }
    if(checked)
    {
      e.preventDefault();
      this.setState({ isOpened: false });
      var item_obj = {
        'id': this.state.selected_id,
        'product_name': this.state.selected_name,
        'category' : this.state.selected_category,
        'store': this.state.selected_storeid,
        'cost': this.state.selected_cost,
        'amount': this.state.selected_amount,
        'description': this.state.selected_des,
        'photo_url': this.state.selected_file
      }

      if (this.state.table_title == "Edit") {
        update_product_by_id(item_obj, (response) => {
          var result = response.data;
          if (response.data !== undefined) 
          {
            this.setState({message: result.msg});
            if (result.success) {
              this.setState({snackError: false, selected_file:null});
              this.getAllProduct(); //refresh   
            } else {
              this.setState({snackError: true});
            }
          }
          this.setState({snackOpen: true});
        });
      } 
      else if (this.state.table_title == "Add") {
        add_product(item_obj, (response) => {
          var result = response.data;
          if (response.data !== undefined)
            this.setState({message: result.msg});
          if (result.success) {
            this.setState({snackError: false});
            this.getAllProduct(); //refresh 
          } else {
            this.setState({snackError: true});
          }
          this.setState({snackOpen: true});
        });
      }
    }
  }
  handleChange_Categories = event => {
    this.setState({selected_category: event.target.value});
  };
  handleChangeStore = event => {
    this.setState({selected_storeid: event.target.value});
    get_store_sub_category({store_id:event.target.value}, (response)=>{
      if(response.data != undefined){
        this.setState({categories:response.data.children});
      }
    });
  }
  handleNamechanged = event => {
    this.setState({selected_name: event.target.value});
  }
  handleDeschanged = event => {
    this.setState({selected_des: event.target.value});
  }
  handlePricechanged = event => {
    this.setState({selected_cost: event.target.value});
  }
  handleAmountchanged = event => {
    this.setState({selected_amount: event.target.value});
  }
  searchByCategories = (e) => {
    this.state.searchCategory = e.target.value;
    this.getAllProduct();
  }
  DeleteDialogClose = () => {
		this.setState({isdeleted: false});
	}
	DeleteDialogAccept = () => {
    this.setState({isdeleted: false});
    var id = this.state.selected_id;

		delete_product_by_id({product_id: id}, (response) => {
      var result = response.data;
        if (response.data !== undefined) {
          this.setState({message: result.msg});
          if (result.success) {
            this.setState({snackError: false});
            this.getAllProduct(); //refresh
          } else {
            this.setState({snackError: true});
          }
        }
        this.setState({snackOpen: true});
    });
	}
  onChangePicture = (event) => {
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

  addProduct = () => {
    this.setState({isOpened : true});
    this.setState({selected_name: ""});
    this.setState({selected_category: ""});
    this.setState({selected_storeid: ""});
    this.setState({selected_cost: 0});
    this.setState({selected_amount: 0});
    this.setState({selected_des: ""});
    this.setState({selected_like_count: ""});
    this.setState({selected_following: ""});
    this.setState({img_url: ''});
    this.setState({ table_title: 'Add' });
  }
  render() {
    const { classes } = this.props;
    const { data, order, orderBy, rowsPerPage, page,isOpened , categories , store_list} = this.state;

    const showProductDetail = () => {
      return <Redirect to={"/"} />
    }

    return (
        <div>
            <Paper className={classes.root}>
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
                <ProductTableToolbar searchProduct={this.searchProduct} addProduct = {this.addProduct} categories={categories} searchProductByCategories = {this.searchByCategories} selectedCategory= {this.state.searchCategory}/>
                <div className={classes.tableWrapper}>
                    <Dialog open={this.state.isOpened}
                      onClose={this.handleClose}
                      aria-labelledby="form-dialog-title" fullWidth
                    >
                    <form>
                    <DialogTitle id="form-dialog-title">{this.state.table_title}</DialogTitle>
                        <DialogContent>
                          <FormGroup className={classes.formGroup}>
                           <FormControl className={classes.formControl} fullWidth>
                            <div className ="add-store-item-wrapper">
                              <span className="add-store-item-left">Name* :</span>
                              <TextField autoFocus
                                          margin = "normal"
                                          placeholder = "Input the product name"
                                          id = "name"
                                          className = "add-store-item-right no-margin"
                                          value = {this.state.selected_name}
                                          onChange = {this.handleNamechanged}
                                          required = {true}
                                          fullWidth
                              />
                            </div>
                            </FormControl>
                          </FormGroup>
                          <FormGroup className={classes.formGroup}>
                            <FormControl className={classes.formControl} fullWidth>
                            <div className ="add-store-item-wrapper">
                              <span className="add-store-img-item-left">Product Image* :</span>
                              <div className = "row">
                                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={this.onChangePicture}/>
                                <label htmlFor="icon-button-file">
                                  <ButtonBase
                                    focusRipple
                                    key={this.state.selected_id}
                                    className={classes.image}
                                    focusVisibleClassName={classes.focusVisible}
                                    component="div"
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
                                <span className="add-store-item-left">Store Name* :</span>
                                <Select
                                    value={this.state.selected_storeid === "" ? "Please select store name" : this.state.selected_storeid}
                                    onChange={this.handleChangeStore}
                                    className="add-store-item-right no-margin"
                                    fullWidth
                                >
                                    {store_list.map(n => (
                                        <MenuItem
                                            key={n.id}
                                            value={n.id}
                                        >
                                            {n.store_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                            </FormControl>
                          </FormGroup>

                          <FormGroup className={classes.formGroup}>
                            <FormControl className={classes.formControl} fullWidth>
                            <div className="add-store-item-wrapper">
                                <span className="add-store-item-left">Category* :</span>
                                <Select
                                    value={this.state.selected_category}
                                    onChange={this.handleChange_Categories}
                                    className="add-store-item-right no-margin"
                                    fullWidth
                                >
                                  {categories.map(n => (
                                    (n.parent===null
                                      ? <MenuItem
                                          key={n.id}
                                          value={n.id}
                                          disabled={true}
                                      >{n.name}</MenuItem>
                                      : <MenuItem key={n.id} value={n.id}>{n.name}</MenuItem>
                                    )
                                  ))}
                                </Select>
                            </div>
                            </FormControl>
                          </FormGroup>
                          
                          <FormGroup className={classes.formGroup}>
                            <FormControl className={classes.formControl} fullWidth>
                            <div className ="add-store-item-wrapper">
                                <span className="add-store-item-left">($) Price* :</span>
                                <TextField 
                                    margin = "normal"
                                    id = "price"
                                    placeholder = "Input the product price"
                                    className = "add-store-item-right no-margin"
                                    value = {this.state.selected_cost > 0 ? this.state.selected_cost : ''}
                                    onChange = {this.handlePricechanged}
                                    required = {true}
                                    fullWidth
                                    type="number"
                                />
                            </div>
                            </FormControl>
                          </FormGroup>
                          <FormGroup className={classes.formGroup}>
                            <FormControl className={classes.formControl} fullWidth>
                            <div className ="add-store-item-wrapper">
                                <span className="add-store-item-left">Amount* :</span>
                                <TextField 
                                    margin = "normal"
                                    id = "amount"
                                    placeholder = "Input the product amount"                                    
                                    className = "add-store-item-right no-margin"
                                    value = {this.state.selected_amount > 0 ? this.state.selected_amount : ''}
                                    onChange = {this.handleAmountchanged}
                                    required = {true}
                                    fullWidth
                                />
                            </div>
                            </FormControl>
                          </FormGroup>
                          <FormGroup className={classes.formGroup}>
                            <FormControl className={classes.formControl} fullWidth>
                            <div className="add-store-item-wrapper">
                                <span className="add-store-item-left">Description :</span>
                                <TextField id="textarea"
                                          label=""
                                          placeholder="Input the product description"
                                          multiline
                                          className="add-store-item-right no-margin"
                                          margin="normal"
                                          value = {this.state.selected_des}
                                          onChange={this.handleDeschanged}
                                          required = {true}
                                          fullWidth
                                />
                            </div>
                            </FormControl>
                          </FormGroup>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="secondary"> Cancel </Button>
                            <Button type="submit" onClick={(el) => {this.addOrEditProduct(el)}} color="primary"> {this.state.table_title} </Button>
                        </DialogActions>
                      </form>
                    </Dialog>

                    <Dialog
                        open={this.state.isdeleted}
                        aria-labelledby="responsive-dialog-title"
                        >
                        <DialogTitle id="responsive-dialog-title">WARNING!!!</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                           It will be not use after. Do you want to delete?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button variant="raised" color="primary" type="submit" onClick={this.DeleteDialogAccept}>
                          Ok
                          </Button>
                          <Button variant="raised" color="secondary" type="submit" onClick={this.DeleteDialogClose} autoFocus>
                          Cancel
                          </Button>
                        </DialogActions>
                    </Dialog>


                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <ProductHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}
                            rowCount={this.state.total}
                        />
                        <TableBody>
                            {data.map((n, idx) => {
                                return (
                                    <TableRow key={n.id}>
                                        <TableCell className={classes.tableCellCenter}>
                                            <span>{ (rowsPerPage * page) + idx + 1 }</span>
                                        </TableCell>
                                        <TableCell className={classes.tableCellCenter}>
                                              <NavLink to={`/product/${n.id}`} className={classes.link}>
                                                  <img width="80" height="80" src={`${getHostAddress()}${n.photo_url}`} />
                                              </NavLink>
                                        </TableCell>
                                        <TableCell className={classes.tableCellCenter} >
                                              <NavLink to={`/product/${n.id}`} className={classes.link}>
                                                {n.product_name}
                                              </NavLink>
                                        </TableCell>
                                        <TableCell className={classes.tableCellCenter}>
                                              {n.category.name}
                                          </TableCell>
                                        <TableCell className={classes.tableCellCenter}>
                                              {n.store.store_name}
                                        </TableCell>
                                        <TableCell numeric>
                                             ${n.cost}
                                        </TableCell>
                                        <TableCell className={classes.tableCellCenter}>
                                            {n.Action}
                                            <div className = "button-cell">
                                                <Button variant="raised" color="primary" fullWidth type="submit" onClick={() => this.handleEditAction({n})}>Edit</Button>&nbsp;&nbsp;
                                                <Button variant="raised" color="secondary" fullWidth type="submit" onClick={() => this.Deletehandle(n.id)}>Delete</Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination component="div"
                    count={this.state.total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                      'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                      'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>           

        </div>
    );
  }
}

ProductTable.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  return  {
    userinfo: state.auth.userinfo
  };
}
export default connect(mapStateToProps, null)(withStyles(styles)(ProductTable));
