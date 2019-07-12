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

import Grid from '@material-ui/core/Grid';
import { get_all_categories, get_all_products } from '../../../apis/admin';
import {getHostAddress} from '../../../apis/index';

const rows = [
  { id: 'id', numeric: false, disablePadding: false, label: 'No', sorting: false },
  { id: 'product_name', numeric: false, disablePadding: false, label: 'Name', sorting: true },
  { id: 'img', numeric: false, disablePadding: false, label: 'Image', sorting: false },
  { id: 'category', numeric: false, disablePadding: false, label: 'Categories', sorting: true },
  { id: 'store_name', numeric: false, disablePadding: false, label: 'Store', sorting: true },
  { id: 'cost', numeric: true, disablePadding: false, label: 'Price', sorting: true }
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
  link: {
    color: "#3f51b5"
  },
  tableCellCenter: {
    textAlign:"center"
  }
});

// made by somi
class ProductTableToolbar extends React.Component {

  render() {
    const { classes, searchProduct, addProduct ,categories, selectedCategory , searchProductByCategories} = this.props;
    return (
      <Toolbar
        className={classNames(classes.root)}
      >
        <div className={classes.searchWrapper}>
          <div>
            
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
    search_key: '',
    searchCategory: 0,
    total: 0
  };
  componentWillMount() {
    this.getAllProducts();

    let temp = {
      sort_dir: '',
      sort_field: '',
      offset: 0,
      limit: 10000,
      cate_type: 'ITEM',
      search_key: ''
    }
    get_all_categories(temp, (response) => {
      if (typeof(response.data) != 'undefined') {
        this.setState({categories: response.data.categories});
      }      
    });
  }

  getAllProducts = () => {
    var obj = {
      'offset': this.state.page*this.state.rowsPerPage,
      'limit': this.state.rowsPerPage,
      'search_key': this.state.search_key,
      'sort_field': this.state.orderBy,
      'sort_dir': this.state.order,
      'search_category': this.state.searchCategory
    }
    get_all_products(obj, (response) => {
      console.log(response);
      if (typeof(response.data) != 'undefined') {
        this.setState({data: response.data.products});
        this.setState({total: response.data.total});
      }
    });

    
  }
  searchProduct = (element) => {
    let str_search = element.currentTarget.value;
    this.state.search_key = str_search;
    this.getAllProducts();  
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
    this.getAllProducts();
  };

  handleClose = () => {
    this.setState({ isOpened: false });
  };

  handleChangePage = (event, page) => {
    this.state.page = page;
    this.getAllProducts();
  };

  handleChangeRowsPerPage = event => {
    this.state.rowsPerPage = event.target.value;
    this.getAllProducts();
  };
  searchByCategories = (e) => {
    this.state.searchCategory = e.target.value;
    this.getAllProducts();
  }

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, rowsPerPage, page,isOpened , categories } = this.state;
    return (
        <div>
            <Paper className={classes.root}>
                <ProductTableToolbar searchProduct={this.searchProduct} addProduct = {this.addProduct} categories={categories} searchProductByCategories = {this.searchByCategories} selectedCategory= {this.state.searchCategory}/>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <ProductHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}
                            rowCount={this.state.total}
                        />
                        <TableBody>
                            {data.map((n, idx) => {
                              console.log(n);
                                return (
                                    <TableRow key={n.id}>
                                        <TableCell className={classes.tableCellCenter}>{ (rowsPerPage * page) + idx + 1 }</TableCell>
                                        <TableCell className={classes.tableCellCenter}>
                                          <NavLink className={classes.link} to={`/product/${n.id}`}>
                                            {n.product_name}
                                          </NavLink>
                                        </TableCell>
                                        <TableCell className={classes.tableCellCenter}>
                                          <NavLink to={`/product/${n.id}`}>
                                              <img width="80" height="80" src={`${getHostAddress()}${n.photo_url}`} />
                                          </NavLink>
                                        </TableCell>
                                        <TableCell className={classes.tableCellCenter}>
                                          {n.category.name}
                                        </TableCell>
                                        <TableCell className={classes.tableCellCenter}>
                                              {n.store.store_name}
                                        </TableCell>
                                        <TableCell numeric>
                                             $ {n.cost}
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
