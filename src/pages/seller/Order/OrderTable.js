import React from 'react';
// import ReactExport from 'react-excel-export';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import {get_all_orders_in_store , set_order_status} from "../../../apis/seller";
import { connect } from 'react-redux';

const rows = [
  {id: 'id', numeric: false, disablePadding: false, label: 'No', sorting: false},
  { id: 'username', numeric: false, disablePadding: false, label: 'User Name', sorting: true },
  { id: 'store_name', numeric: false, disablePadding: false, label: 'Store Name', sorting: true },
  { id: 'item_name', numeric: false, disablePadding: false, label: 'Item Name', sorting: true },
  { id: 'amount', numeric: true, disablePadding: false, label: 'Amount', sorting: true },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status', sorting: true }
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

class OrderTableHead extends React.Component {
  createSortHandler = property => event => {
    if (property.sorting == false){
      return;
    }
    this.props.onRequestSort(event, property.id);
  };

  render() {
    const {order, orderBy, numSelected, rowCount } = this.props;

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
  }
});

class OrderTableToolbar extends React.Component {

  render() {
    const { classes, searchOrder } = this.props;
    return (
      <Toolbar
        className={classNames(classes.root)}
      >
        <div className={classes.searchWrapper}>
          <form className={classes.searchForm}>
            <IconButton
              aria-label="Search"
              className={classes.searchIcon}
            >
              <SearchIcon />
            </IconButton>
            <input className={classes.searchInput} type="text" placeholder="Search" autoFocus={true} onChange={(e) => this.props.searchOrder(e)} />
          </form>
        </div>
      </Toolbar>
    );
  }
};

OrderTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  searchOrder: PropTypes.func
};

OrderTableToolbar = withStyles(toolbarStyles)(OrderTableToolbar);

OrderTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  tableCellCenter: {
    textAlign:'center'
  }
});

class OrderTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: '',
    orders: [],
    page: 0,
    rowsPerPage: 5,
    index: 0,
    search_key: '',
    total_count: 0
  };
   constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.getAllOrders();
  }

  getAllOrders = () => {
    // let temp = {
    //   offset: this.state.index,
    //   limit: this.state.rowsPerPage,
    //   sort_field: this.state.orderBy,
    //   sort_dir: this.state.order,
    //   search_key: this.state.search_key,
    //   user_id: this.props.userinfo.userid
    // };

    let temp = {
      store_id: 1, // made by somi
      user_id: this.props.userinfo.userid
    }

    get_all_orders_in_store(temp, (response) => {
      if (typeof(response.data) != 'undefined') {
        this.setState({orders: response.data.orders});
        this.setState({total_count: response.data.total});
      }
    });
  }

  handleRequestSort = (event, property) => {
    this.state.orderBy = property;
    if (this.state.order == 'asc') {
      this.state.order = 'desc';
    }
    else {
      this.state.order = 'asc';
    }
    this.getAllOrders();
  };

  // handleClick = (event, id) => {
  //   const { selected } = this.state;
  //   const selectedIndex = selected.indexOf(id);
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, id);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1),
  //     );
  //   }

  //   this.setState({ selected: newSelected });
  // };

  handleChangePage = (event, page) => {
    // this.setState({ page });
    this.state.index = page;
    this.getAllOrders();
  };

  handleChangeRowsPerPage = event => {
    // this.setState({ rowsPerPage: event.target.value });
    this.state.rowsPerPage = event.target.value;
    this.getAllOrders();
  };

  searchOrder = (element) => {

    var str_search = element.target.value;
    this.setState({searchKey: str_search});
    if (str_search.length == 0) {
      this.getAllOrders();
    }
    else {
      let tmp_orders = [];
      let arr_orders = this.state.orders;
      arr_orders.map((order, index) => {
        if (order.user.username.toLowerCase().indexOf(str_search.toLowerCase()) != -1 || order.item.store.store_name.toLowerCase
        ().indexOf(str_search.toLowerCase()) != -1 || order.item.item_name.toLowerCase().indexOf(str_search.toLowerCase()) != -1) {
          tmp_orders.push(order);
        }
      });

      this.setState({orders: tmp_orders});
      this.setState({searchKey: str_search});
    }
  }


  render() {
    const { classes } = this.props;
    const { orders, order, orderBy, selected, rowsPerPage, page, total_count } = this.state;

    return (
      <Paper className={classes.root}>
        <OrderTableToolbar searchOrder={this.searchOrder} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <OrderTableHead
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={total_count}
            />
            <TableBody>
              {orders
                .map((n, index) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={this.state.index*this.state.rowsPerPage+index+1}
                    >
                      <TableCell className={classes.tableCellCenter}>{this.state.index*this.state.rowsPerPage+index+1}</TableCell>
                      <TableCell className={classes.tableCellCenter}> 
                            {n.user.username}
                      </TableCell>
                      <TableCell className={classes.tableCellCenter}>
                            {n.item.store.store_name}
                      </TableCell>
                      <TableCell className={classes.tableCellCenter}>
                            {n.item.item_name}
                      </TableCell>
                      <TableCell numeric>
                            {n.amount}
                      </TableCell>
                      <TableCell  className={classes.tableCellCenter}>                            
                        
                        {(n.status=='Ordered'
                          ? <a className="status-button green">{n.status}</a>
                          : undefined
                        )}
                        {(n.status=='PENDING'
                          ? <a className="status-button warning">{n.status}</a>
                          : undefined
                        )}
                        {(n.status=='Delivered'
                          ? <a className="status-button primary">{n.status}</a>
                          : undefined
                        )}
                        {(n.status=='In Preparation'
                          ? <a className="status-button primary">{n.status}</a>
                          : undefined
                        )}
                        {(n.status=='Shipped'
                          ? <a className="status-button primary">{n.status}</a>
                          : undefined
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={total_count}
          rowsPerPage={rowsPerPage}
          page={this.state.index}
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
    );
  }
}

OrderTable.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => {
  return  {
    userinfo: state.auth.userinfo
  };
}
export default connect(mapStateToProps, null)(withStyles(styles)(OrderTable));
