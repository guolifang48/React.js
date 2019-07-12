import React from 'react';
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
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { get_all_transactions } from '../../../apis/seller';
import { connect } from 'react-redux';

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

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#3f51b5',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

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

const rows = [
  { id: 'no', numeric: false, disablePadding: false, label: 'No' ,sorting: false},
  { id: 'username', numeric: false, disablePadding: false, label: 'Username' ,sorting: true},
  { id: 'store_name', numeric: false, disablePadding: false, label: 'Storename' ,sorting: true},
  { id: 'total', numeric: true, disablePadding: false, label: 'Total' ,sorting: true},
  { id: 'created_at', numeric: false, disablePadding: false, label: 'CreatedAt' ,sorting: true}
];

class TransactionTableHead extends React.Component {
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
    textAlign:"center"
  },
  link: {
    color: "#3f51b5"
  },
});

class TransactionTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'id',
    transactions: [],
    page: 0,
    rowsPerPage: 5,
    total: 0,
    search_key: ''
  };

  showTransactionHistroy = (transaction) => {
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    this.state.order = order;
    this.state.orderBy = orderBy;

    this.getTransactions();
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.getTransactions();
  }

  getTransactions = () => {
    // var trans_obj = {
    //   'user_id': this.props.userinfo.userid,
    //   'offset': this.state.page,
    //   'limit': this.state.rowsPerPage,
    //   'sort_field': this.state.orderBy,
    //   'sort_dir': this.state.order,
    //   'search_key': this.state.search_key
    // }
    var temp = {
      'store_id': 1,
      'user_id': this.props.userinfo.userid,
    }
    get_all_transactions(temp, (response) => {
      if (typeof(response.data) != 'undefined') { 
        var result = response.data 
        this.setState({transactions: result.transactions});
        this.setState({total: result.total});
      }
    });
  }

  handleChangePage = (event, page) => {
    this.state.page = page;
    this.getTransactions();
  };

  handleChangeRowsPerPage = event => {
    this.state.rowsPerPage = event.target.value;
    this.getTransactions();
  };

  searchTransaction = (element) => {
    let str_search = element.target.value;
    this.state.search_key = str_search;
    this.getTransactions();
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
              rowCount={this.state.total}
            />
            <TableBody>
              {transactions
                .map((n, idx) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={n.id}
                    >
                      <TableCell className={classes.tableCellCenter}>
                          {(page * rowsPerPage ) + idx + 1 }
                      </TableCell>
                      <TableCell className={classes.tableCellCenter}>
                          {n.user.username}
                      </TableCell>
                      <TableCell className={classes.tableCellCenter}>
                          {n.store.store_name}
                      </TableCell>
                      <TableCell numeric>
                          $ {n.total}
                      </TableCell>
                      <TableCell className={classes.tableCellCenter}>
                          {n.created_at.split('T')[0]}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
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
    );
  }
}

TransactionTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return  {
    userinfo: state.auth.userinfo
  };
}

export default connect(mapStateToProps, null)(withStyles(styles)(TransactionTable));
