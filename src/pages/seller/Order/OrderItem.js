import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { connect } from 'react-redux';
import { get_all_order } from '../../../apis';

function onClickBtnEdit() {

}
function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'no', numeric: true, disablePadding: false, label: 'No' },
  { id: 'name', numeric: true, disablePadding: false, label: 'Buyer' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Ordered time' },
  { id: 'amount', numeric: true, disablePadding: false, label: 'Store' },
  { id: 'date_added', numeric: true, disablePadding: false, label: 'Item name' },
  { id: 'date_ordered', numeric: true, disablePadding: false, label: 'Ordered amount' },
  { id: 'ordered', numeric: true, disablePadding: false, label: 'ORDERED' }
];

class ProductHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {order, orderBy, rowCount } = this.props;
    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                className="table-head"
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
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
});
const styles = theme => ({
  root: {
    width: '100%'
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});
// made by somi

class OrderedTable extends React.Component {
  //
  dialog_state = {
    open: false,
  };
  state = {
    order: 'asc',
    orderBy: 'id',
    data: [],
    page: 0,
    rowsPerPage: 5,
  };
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    var aryOrder = [];
    get_all_order((response) => {
      var m_Arr = [];
      aryOrder = response.data;
      for (var i = 0; i < aryOrder.length; i++) {
        if(aryOrder[i].item.store.owner.id == this.props.userinfo.userid && this.props.status == aryOrder[i].status) {
          m_Arr.push(aryOrder[i]);
        }
      }
      this.setState({data: m_Arr});
    });
  }
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  onCheckedDelievered = () => {
    console.log('edit clicked');
  };
  render() {
    const { classes } = this.props;
    const { data, order, orderBy, rowsPerPage, page} = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
          <ProductHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n, idx) => {
                  return (
                    <TableRow key={n.id}>
                      <TableCell scope="row" padding="none" width = "50">
                        <div className="store-wrapper">
                          <span>{(page * rowsPerPage) + idx + 1}</span>
                        </div>
                      </TableCell>
                      <TableCell  scope="row" padding="none">
                        <div className="store-wrapper">
                          {n.user.username}
                        </div>
                      </TableCell>
                      <TableCell scope="row" padding="none">
                        <div className="store-wrapper">
                           {n.date_ordered.split('T')[0]}
                        </div>
                      </TableCell>
                      <TableCell scope="row" padding="none">
                        <div className="store-wrapper">
                          {n.item.store.store_name}
                        </div>
                      </TableCell>
                      <TableCell scope="row" padding="none">
                        <div className="store-wrapper">
                          {n.item.item_name}
                        </div>
                      </TableCell>
                      <TableCell scope="row" padding="none">
                        <div className="store-wrapper">
                          {n.amount}
                        </div>
                      </TableCell>
                      {
                        n.status == "DELIVERED" ?
                          <TableCell scope="row" padding="none" width = "50">
                            {n.status}
                          </TableCell>
                        :
                          <TableCell scope="row" padding="none" width = "50">
                            <div className="order-btn">
                              <Button variant="raised" color="primary" fullWidth type="submit">SHIPPED</Button>&nbsp;&nbsp;
                            </div>
                          </TableCell>
                      }
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
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

OrderedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return  {
    userinfo: state.auth.userinfo
  };
}

export default connect(mapStateToProps, null)(withStyles(styles)(OrderedTable));
