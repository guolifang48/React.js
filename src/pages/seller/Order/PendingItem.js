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

import { mockOrder } from '../../../utils/mock';
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
  { id: 'name', numeric: true, disablePadding: false, label: 'Product name' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
  { id: 'amount', numeric: true, disablePadding: false, label: 'Amount' },
  { id: 'date_added', numeric: true, disablePadding: false, label: 'Add time' },
  { id: 'date_ordered', numeric: true, disablePadding: false, label: 'Order time' },
  { id: 'status', numeric: true, disablePadding: false, label: 'Delievered' },
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

class PendingTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'id',
    data: [],
    page: 0,
    rowsPerPage: 5,
    isOpen: false,
    selectedId: 0,
  };
  constructor(props) {
    super(props);

  }
  componentWillMount() {
    var kkk = [];
    get_all_order((response) => {
      kkk = response.data;      
      this.setState({
        data: kkk
      })
      let m_Arr = [];
      this.state.data.map(order => {
        if (order.item.store.owner.id == this.props.userinfo.userid && this.props.status == order.status) {
          m_Arr.push(order);
        }
      })
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
  onCheckedDelievered = (data) => {
    this.setState({selectedId: data.id});
    for (let i =0 ;i < this.state.data.length ;i ++){
      if (this.state.data[i].id == data.id) {
        this.state.data[i].status = "DELIEVERED";
        this.state.data.splice(i, 1);
      }
    }
    this.setState({data: this.state.data});
  };
  handleClose = () => {
    this.setState({ isOpen: false });
  };
  handleAccept = () => {
    
  };
  render() {
    const { classes } = this.props;
    const { data, order, orderBy, rowsPerPage, page} = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Dialog
          open={this.state.isOpen}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">{"DELIEVERED"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
               Do you want to check this product?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleAccept} color="primary" autoFocus>
                Accept
              </Button>
            </DialogActions>
          </Dialog>


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
                .map((n , idx) => {
                  return (
                    <TableRow>
                      <TableCell scope="row" padding="none" width = "50">
                        <div className="store-wrapper"> 
                          <span>{(page * rowsPerPage) + idx + 1}</span>
                        </div>
                      </TableCell>
                      <TableCell scope="row" padding="none" width = "50">
                        <div className="store-wrapper"> 
                          <span>{n.item.item_name}</span>
                        </div>
                      </TableCell>
                      <TableCell scope="row" padding="none" width = "50">
                        <div className="store-wrapper"> 
                          <span>$ {n.item.price}</span>
                        </div>
                      </TableCell>
                      <TableCell scope="row" padding="none" width = "50">
                        <div className="store-wrapper"> 
                          <span>{n.amount}</span>
                        </div>
                      </TableCell>
                      <TableCell scope="row" padding="none" width = "50">
                        <div className="store-wrapper"> 
                          <span>{n.date_added.split('T')[0]}</span>
                        </div>
                      </TableCell>

                      <TableCell scope="row" padding="none" width = "50">
                        <div className="store-wrapper"> 
                          <span>{n.date_ordered.split('T')[0]}</span>
                        </div>
                      </TableCell>
      
                      <TableCell scope="row" padding="none" width = "50">{n.item.status}
                        <div className="order-btn">
                          <Button variant="raised" color="primary" fullWidth type="submit" onClick={() => this.onCheckedDelievered(n)}>ACCEPT</Button>&nbsp;&nbsp;
                        </div>
                      </TableCell>
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

PendingTable.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return  {
    userinfo: state.auth.userinfo
  };
}
export default connect(mapStateToProps, null)(withStyles(styles)(PendingTable));
