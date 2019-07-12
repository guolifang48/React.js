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
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import {get_all_transactions} from '../../../apis/admin';


const rows = [
  { id: 'id', numeric: false, disablePadding: false, label: 'No', sorting: false },
  { id: 'user', numeric: false, disablePadding: false, label: 'User Name', sorting: true },
  { id: 'store', numeric: false, disablePadding: false, label: 'Store Name', sorting: true },
  { id: 'total', numeric: false, disablePadding: false, label: 'Total', sorting: true },
  { id: 'created_at', numeric: false, disablePadding: false, label: 'Created', sorting: true }
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

class TransactionTableHead extends React.Component {
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
    border: 'none',
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

class TransactionTableToolbar extends React.Component {

  render() {
    const { classes, searchTransaction } = this.props;
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
            <input className={classes.searchInput} type="text" placeholder="Search" autoFocus={true} onChange={(e) => this.props.searchTransaction(e)} />
          </form>
        </div>
      </Toolbar>
    );
  }
};

TransactionTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  searchTransaction: PropTypes.func
};

TransactionTableToolbar = withStyles(toolbarStyles)(TransactionTableToolbar);

TransactionTableHead.propTypes = {
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
    textAlign: 'center'
  }
});

class TransactionTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: '',
    transactions: [],
    page: 0,
    rowsPerPage: 5,
    index: 0,
    search_key: ''
  };

  componentWillMount() {
    // api start
    // this.getAllTransactions();
  }

  getAllTransactions = () => {
    let temp = {
      search_key: this.state.search_key,
      sort_field: this.state.orderBy,
      sort_dir: this.state.order,
      offset: this.state.index,
      limit: this.state.rowsPerPage
    }
    // read api
    get_all_transactions(temp, (response) => {
      if (typeof(response.data) != 'undefined') {
        this.setState({transactions: response.data.transactions});
        this.setState({total_count: response.data.total});
      }
    });
  }
  handleRequestSort = (event, property) => {
    const orderBy = property;
    this.state.orderBy = orderBy;
    if (this.state.order == 'asc') {
      this.state.order = 'desc';
    }
    else {
      this.state.order = 'asc';
    }
    this.getAllTransactions();
  };

  handleChangePage = (event, page) => {
    // this.setState({ page });
    this.state.index = page;
    this.getAllTransactions();
  };

  handleChangeRowsPerPage = event => {
    this.state.rowsPerPage = event.target.value;
    this.getAllTransactions();
    // this.setState({ rowsPerPage: event.target.value });
  };

  searchTransaction = (element) => {

    /*
    * api get_sellers_by_name
    * params searchKey(string)
    * return sellers(array)
    */
    let str_search = element.target.value;
    this.state.search_key = str_search;
    this.getAllTransactions();
  }


  render() {
    const { classes } = this.props;
    const { transactions, order, orderBy, selected, rowsPerPage, page } = this.state;

    return (
      <Paper className={classes.root}>
        <TransactionTableToolbar searchTransaction={this.searchTransaction} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TransactionTableHead
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={this.state.total_count}
            />
            <TableBody>
              {transactions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n, index) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={this.state.index*this.state.rowsPerPage+index+1}
                    >
                      <TableCell className={classes.tableCellCenter}>
                        {this.state.index*this.state.rowsPerPage+index+1}
                      </TableCell>
                      <TableCell className={classes.tableCellCenter}>
                        {n.user.username}
                      </TableCell>
                      <TableCell className={classes.tableCellCenter}>
                        {n.store.store_name}
                      </TableCell>
                      <TableCell className={classes.tableCellCenter}>
                        $ {n.total}
                      </TableCell>
                      <TableCell className={classes.tableCellCenter}>
                        {n.created_at}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={this.state.total_count}
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

TransactionTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TransactionTable);
