import React from 'react';
import {NavLink} from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Snackbar from "@material-ui/core/Snackbar";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import { CustomSnack } from '../../../components';
import { get_all_users } from "../../../apis/admin";
import { update_user_by_id, delete_user_by_id } from "../../../apis/admin";

const rows = [
  {id: 'id', numeric: false, disablePadding: false, label: 'No', sorting: false},
  { id: 'username', numeric: false, disablePadding: true, label: 'User Name', sorting: true },
  { id: 'user_status', numeric: false, disablePadding: false, label: 'User Status', sorting: true },
  { id: 'role', numeric: false, disablePadding: false, label: 'Role', sorting: true },
  { id: 'action', numeric: false, disablePadding: false, label: 'Action', sorting: false }
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
  }
});

class CustomerTableToolbar extends React.Component {

  render() {
    const { classes, searchCustomer } = this.props;
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
            <input className={classes.searchInput} type="text" placeholder="Search" autoFocus={true} onChange={(e) => searchCustomer(e)} />
          </form>
        </div>
      </Toolbar>
    );
  }
};

CustomerTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  searchCustomer: PropTypes.func
};

CustomerTableToolbar = withStyles(toolbarStyles)(CustomerTableToolbar);

class CustomerTableHead extends React.Component {
  createSortHandler = property => event => {
    if (property.sorting == false){
      return;
    }
    this.props.onRequestSort(event, property.id);
  };

  render() {
    const { rowCount } = this.props;

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

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#3f51b5',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

CustomerTableHead.propTypes = {
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
  marginLeft_5: {
    marginLeft: '5px'
  },
  formControl: {
    width: 250,
  },
  formGroup: {
    marginBottom: '15px'
  },
  link: {
    color: "#3f51b5"
  },
  tableCellCenter: {
    textAlign:"center"
  }
});

class CustomerTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: '',
    selected: [],
    customers: [],
    page: 0,
    rowsPerPage: 5,
    total_count: 0,
    isOpened: false,
    eUsername: '',
    eUserId: 0,
    eUserSellerStatus: 'NONE',
    eUserRole: 'ADMIN',
    mStatus: ['NONE', 'SELLER', 'PENDING'],
    eUserStatus: 'ACTIVE',
    index: 0,
    search_key: '',
    message: '',
    snackOpen: false,
    deleteOpen: false,
    userRole: 0,
    roles: ['All', 'ADMIN', 'SELLER', 'CUSTOMER', 'SUPPORTER']
  };

  componentWillMount(){
    // api start
    this.getAllUsers();
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

    this.getAllUsers();
  };

  handleChangePage = (event, page) => {
    this.state.index = page;
    this.getAllUsers();
  };

  handleChangeRowsPerPage = event => {
    this.state.rowsPerPage = event.target.value;
    this.getAllUsers();
  };

  handleEditor = () => {
    let temp = {
      id: this.state.eUserId,
      username: this.state.eUsername,
      role: this.state.eUserRole,
      seller_status: this.state.eUserSellerStatus,
      user_status: this.state.eUserStatus
    }
    // api
    update_user_by_id(temp, (response) => {
      if (typeof(response.data) != 'undefined') {
        this.state.message = response.data.msg;
        if (response.data.success == true) {
          this.state.snackError = false;
        }
        else {
          this.state.snackError = true;
        }
        this.setState({snackOpen: true});
        this.setState({isOpened: false});
        // table reload
        this.getAllUsers();
      }
    });
  }
  handleClose = () => {  
    this.setState({ isOpened: false });
  };

  searchCustomer = (element) => {
    let str = element.target.value;
    this.state.search_key = str;
    this.getAllUsers();
  }

  getAllUsers = () => {

    /*
    * api get_all_users
    * params none
    * return all users
    */
    let temp = {
      offset: this.state.index * this.state.rowsPerPage,
      limit: this.state.rowsPerPage,
      search_key: this.state.search_key,
      sort_field: this.state.orderBy,
      sort_dir: this.state.order,
      role: this.state.roles[this.state.userRole]
    };
    get_all_users(temp, (response) => {
      console.log(response);
      if (typeof(response.data) != 'undefined') {
        this.setState({customers: response.data.users});
        this.setState({total_count: response.data.total});
      }
    });
  }

  handleDialogAction = () => {
    let temp = {
      id: this.state.eUserId
    }
    delete_user_by_id(temp, (response) => {
      if (typeof(response.data) != 'undefined') {
        this.setState({snackOpen: true});
        this.setState({messge: response.data.msg});
        if (response.data.success == true) {
          this.setState({snackError: false});
        }
        else {
          this.setState({snackError: true});
        }
        this.setState({snackOpen: true});
      }
    });
    this.setState({deleteOpen: false});
  }

  openDeleteDialog = (el, user_id) => {
    this.setState({eUserId: user_id});
    this.setState({deleteOpen: true});
  }

  openEditDialog = (el, user) => {
    this.setState({eUsername: user.username});
    this.setState({eUserSellerStatus: user.seller_status});
    this.setState({eUserRole: user.role});
    this.setState({isOpened: true});
    this.setState({eUserStatus: user.user_status});
    this.setState({eUserId: user.id});
  }

  handleChangeUserStatus = event => {
    this.setState({eUserStatus: event.target.value});
  }

  handleChangeName = event => {
    this.setState({eUsername: event.target.value});
  }

  handleChangeStatus = event => {
    if (this.state.eUserRole == 'SELLER'){
      this.setState({eUserSellerStatus: event.target.value});
    }
    else {
      this.setState({eUserSellerStatus: 'NONE'});
    }
  }

  handleChangeRole = event => {
    this.setState({eUserRole: event.target.value});
    if (event.target.value != 'SELLER'){
      this.setState({eUserSellerStatus: 'NONE'});
    }
  }

  handleCloseSnackbar = () => {
    this.setState({snackOpen: false});
  }

  handleDeleteClose = () => {
    this.setState({deleteOpen: false});
  }

  handleChangeType = (event, value) => {
    this.state.userRole = value;
    this.setState({userRole: value});
    this.getAllUsers();
  }

  render() {
    const { classes } = this.props;
    const { order, orderBy, selected, rowsPerPage, page, customers, isOpened, eUsername, eUserId, eUserSellerStatus, eUserRole, total_count, eUserStatus } = this.state;
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
        <CustomerTableToolbar searchCustomer={this.searchCustomer}/>
        <Dialog
          open={this.state.isOpened}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          >
          <DialogTitle id="form-dialog-title">Edit Customer</DialogTitle>
          <DialogContent>
              <FormGroup className={classes.formGroup}>
                <FormControl className={classes.formControl}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="UserName"
                  fullWidth
                  value={eUsername}
                  onChange={this.handleChangeName}
                />
                </FormControl>
                </FormGroup>
              <FormGroup className={classes.formGroup}>
              <FormControl className={classes.formControl}>
              <InputLabel htmlFor="user-role">User Role</InputLabel>
              <Select
                  value={eUserRole}
                  fullWidth
                  label="ROLE"
                  onChange={this.handleChangeRole}
                  input={<Input id="user-role" />}
              >
                <MenuItem value="ADMIN" key="ADMIN">ADMIN</MenuItem>
                <MenuItem value="SELLER" key="SELLER">SELLER</MenuItem>
                <MenuItem value="CUSTOMER" key="CUSTOMER">CUSTOMER</MenuItem>
                <MenuItem value="SUPPORTER" key="SUPPORTER">SUPPORTER</MenuItem>
              </Select>
              </FormControl>
              </FormGroup>
            <FormGroup className={classes.formGroup}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="user-status">User Status</InputLabel>
                <Select
                    value={eUserStatus}
                    fullWidth
                    label="User Status"
                    onChange={this.handleChangeUserStatus}
                    input={<Input id="user-status" />}
                  >
                  <MenuItem value="ACTIVE" key="ACTIVE">ACTIVE</MenuItem>
                  <MenuItem value="SUSPENDED" key="SUSPENDED">SUSPENDED</MenuItem>
                </Select>
                </FormControl>
              </FormGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleEditor} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.deleteOpen}
          onClose={this.handleDeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Warning</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">Are you sure to delete this user?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="raised" onClick={this.handleDeleteClose} color="secondary">
              Cancel
            </Button>
            <Button variant="raised" onClick={this.handleDialogAction} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Paper square>
          <Tabs value={this.state.userRole} onChange={this.handleChangeType}>
            <Tab label="All" />
            <Tab label="ADMIN" />
            <Tab label="SELLER" />
            <Tab label="CUSTOMER" />
            <Tab label="SUPPORTER" />
          </Tabs>
        </Paper>    
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <CustomerTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={total_count}
            />
            <TableBody>
              {this.state.customers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n, index) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={this.state.index*this.state.rowsPerPage+index+1}
                    >
                      <TableCell className={classes.tableCellCenter} padding="none">{this.state.index*this.state.rowsPerPage+index+1}</TableCell>
                      <TableCell  className={classes.tableCellCenter}>
                        <NavLink className={classes.link} to={`/user/${n.id}`}>{n.username}</NavLink>
                      </TableCell>
                      <TableCell  className={classes.tableCellCenter}><a className="status-button warning">{n.user_status}</a></TableCell>
                      <TableCell  className={classes.tableCellCenter}><a className="status-button green">{n.role}</a></TableCell>
                      <TableCell  className={classes.tableCellCenter}>
                        <Button variant="raised" color="primary" type="submit" onClick={(el) => this.openEditDialog(el, n)}>Edit</Button>
                        <Button variant="raised" color="secondary" type="submit" className={classes.marginLeft_5} onClick={(el) => this.openDeleteDialog(el, n.id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
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
        </div>
      </Paper>
    );
  }
}

CustomerTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomerTable);
