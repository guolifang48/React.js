import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
import { lighten } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { get_all_sellers } from '../../../apis/admin';
import { update_user_status } from '../../../apis/admin';
import { update_seller_status } from '../../../apis/admin';
import Snackbar from "@material-ui/core/Snackbar";
import { CustomSnack } from '../../../components';

const rows = [
  {id: 'id', numeric: false, disablePadding: false, label: 'No', sorting: false},
  { id: 'username', numeric: false, disablePadding: true, label: 'Name', sorting: true },
  { id: 'seller_status', numeric: false, disablePadding: false, label: 'Seller Status', sorting: true },
  { id: 'user_status', numeric: false, disablePadding: false, label: 'User Status', sorting: true },
  { id: 'created_at', numeric: false, disablePadding: false, label: 'Created', sorting: true },
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

class SellerTableToolbar extends React.Component {

  render() {
    const { classes, searchSeller } = this.props;
    return (
      <Toolbar
        className={classNames(classes.root)}
      >
        <div className={classes.title}>
        </div>
        
        <div className={classes.searchWrapper}>
          <form className={classes.searchForm}>
            <IconButton
              aria-label="Search"
              className={classes.searchIcon}
            >
              <SearchIcon />
            </IconButton>
            <input className={classes.searchInput} type="text" placeholder="Search" autoFocus={true} onChange={(e) => this.props.searchSeller(e)} />
          </form>
        </div>
      </Toolbar>
    );
  }
};

SellerTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  searchSeller: PropTypes.func
};

SellerTableToolbar = withStyles(toolbarStyles)(SellerTableToolbar);

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#3f51b5',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class SellerTableHead extends React.Component {
  createSortHandler = property => event => {
    if (property.sorting == false){
      return;
    }
    this.props.onRequestSort(event, property.id);
  };

  render() {
    const { order, orderBy, numSelected, rowCount } = this.props;

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

SellerTableHead.propTypes = {
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
  link: {
    color: "#3f51b5"
  },
  dialog: {
    minWidth: 600
  },
  tableCellCenter: {
    textAlign: 'center'
  }
});

class SellerTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: '',
    selected: [],
    sellers: [],
    page: 0,
    index: 0,
    rowsPerPage: 5,
    search_key: '',
    total_count: 0,
    isOpen: false,
    dialogTitle: '',
    dialogContent: '',
    selectedSeller: {},
    dialogMethod: 'seller',
    snackOpen: false,
    message: '',
    snackError: false
  };

  componentWillMount() {

    // this.getAllSellers();
  }

  getAllSellers = () => {
    let temp = {
      offset: this.state.index,
      limit: this.state.rowsPerPage,
      search_key: this.state.search_key,
      sort_field: this.state.orderBy,
      sort_dir: this.state.order
    }

    get_all_sellers(temp, (response) => {
      if (typeof(response.data) != 'undefined') {
        this.setState({sellers: response.data.sellers});
        this.setState({total_count: response.data.total});
      }
    });
  }

  handleRequestSort = (event, property) => {
    if (property == 'action') {
      return;
    }
    this.state.orderBy = property;
    if (this.state.order == 'asc') {
      this.state.order = 'desc';
    }
    else {
      this.state.order = 'asc';
    }
    this.getAllSellers();
  };

  handleChangePage = (event, page) => {
    // this.setState({ page });
    this.state.index = page;
    this.getAllSellers();
  };

  handleChangeRowsPerPage = event => {
    let limit = event.target.value;
    this.state.rowsPerPage = limit;
    this.getAllSellers();
  };

  openDialog = (seller, method) => {

    /*
    * api update_seller_status
    * params userid(int)
    * return response
    */
    this.setState({selectedSeller: seller});
    this.setState({dialogMethod: method});
    if (method == 'seller') {
      if (seller.seller_status == 'PENDING') {
        this.setState({dialogTitle: 'Approve'});
        this.setState({dialogContent: 'Are you sure to approve this seller?'});
      }
      else if (seller.seller_status == 'APPROVED') {
        this.setState({dialogTitle: 'Suspend'});
        this.setState({dialogContent: 'Are you sure to suspend this seller?'});
      }
    }
    else {
      if (seller.user_status == "NONE") {
        this.setState({dialogTitle: 'Active'});
        this.setState({dialogContent: 'Are you sure to active this seller?'});
      }
      else{
        this.setState({dialogTitle: 'Suspend'});
        this.setState({dialogContent: 'Are you sure to suspend this seller?'});
      }
    }
    this.setState({isOpen: true});
  }

  searchSeller = (element) => {

    /*
    * api get_sellers_by_name
    * params search_key(string)
    * return sellers(array)
    */
    let str_search = element.target.value;
    // this.setState({search_key: str_search});
    this.state.search_key = str_search;
    this.getAllSellers();
  }

  handleClose = () => {
    this.setState({isOpen: false});
  }

  handleDialogAction = () => {
    if (this.state.dialogMethod == 'seller') {
      let temp = {
          id: this.state.selectedSeller.id,
          seller_status: 'APPROVED'
      };
      if (this.state.dialogTitle == 'Active') {
        temp.seller_status = 'APPROVED';
      }
      else {
        temp.seller_status = 'PENDING';
      }
      // api update_seller_status
      update_seller_status(temp, (response) => {
        if (typeof(response.data) != 'undefined') {
          this.setState({message: response.data.msg});
          if (response.data.success == true) {
            this.state.snackError = false;
          }
          else {
            this.state.snackError = true;
          }
          this.setState({snackOpen: true});
          this.getAllSellers();
        }
      });
    }
    else {
      let temp = {
          id: this.state.selectedSeller.id,
          user_status: 'Active'
      };
      if (this.state.dialogTitle == 'Active') {
        temp.user_status = 'Active';
      }
      else {
        temp.user_status = 'None';
      }
      // api update_user_status
      update_user_status(temp, (response) => {
        if (typeof(response.data) != 'undefined') {
          this.setState({message: response.data.msg});
          if (response.data.success == true) {
            this.state.snackError = false;
          }
          else {
            this.state.snackError = true;
          }
          this.setState({snackOpen: true});
          this.getAllSellers();
        }
      });
    }
    this.setState({isOpen: false});
  }
  
  handleCloseSnackbar = () => {
    this.setState({snackOpen: false});
  }

  render() {
    const { classes } = this.props;
    const { sellers, order, orderBy, selected, rowsPerPage, page, total_count } = this.state;

    return (
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
        <Dialog
          open={this.state.isOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.state.dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">{this.state.dialogContent}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="raised" onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button variant="raised" onClick={this.handleDialogAction} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <SellerTableToolbar searchSeller={this.searchSeller}/>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <SellerTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={total_count}
            />
            <TableBody>
              {sellers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n, index) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={this.state.index*this.state.rowsPerPage+index+1}
                    >
                      <TableCell className={classes.tableCellCenter}>{this.state.index*this.state.rowsPerPage+index+1}</TableCell>
                      <TableCell className={classes.tableCellCenter}>
                        <NavLink className={classes.link} to={`/user/${n.id}`}>{n.username}</NavLink>
                      </TableCell>
                      <TableCell className={classes.tableCellCenter}>
                        <Button variant="raised" onClick={() => this.openDialog(n, 'seller')} color={(n.seller_status=='PENDING')? 'secondary': 'primary'}> {n.seller_status} </Button>
                      </TableCell>
                      <TableCell className={classes.tableCellCenter}><Button variant="raised" color={(n.user_status=='NONE')? 'secondary': 'primary'} onClick={() => this.openDialog(n, 'user')}>{n.user_status}</Button></TableCell>
                      <TableCell className={classes.tableCellCenter}>{n.created_at}</TableCell>
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

SellerTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SellerTable);
