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
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import ButtonBase from '@material-ui/core/ButtonBase';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from "@material-ui/core/Snackbar";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CustomSnack } from '../../../components';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { get_all_advertises, add_advertise, update_advertise_status } from '../../../apis/admin';

const image_name = '';
const rows = [
  {id: 'id', numeric: false, disablePadding: false, label: 'No', sorting: false},
  { id: 'img_url', numeric: false, disablePadding: false, label: 'Image', sorting: false},
  { id: 'expired_time', numeric: false, disablePadding: false, label: 'Expired Time', sorting:true },
  { id: 'priority', numeric: true, disablePadding: false, label: 'Priority', sorting: true },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status', sorting: true },
  { id: 'action', numeric: false, disablePadding: false, label: 'Action', sorting: false }
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

class AdvertiseTableHead extends React.Component {
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
          {rows.map((row, index) => {
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
});

class AdvertiseTableToobar extends React.Component {

  render() {
    const { classes, addAdvertise } = this.props;
    return (
      <Toolbar
        className={classNames(classes.root)}
      >
        <div className={classes.title}>
        </div>
        
        <div className={classes.searchWrapper}>
          <div>
            <div className = "add-button">
              <Button variant="raised" color="secondary" fullWidth type="submit" onClick={() => this.props.openAdvertiseModal()}>Add</Button>
            </div>
          </div>
        </div>
      </Toolbar>
    );
  }
};

AdvertiseTableToobar.propTypes = {
  classes: PropTypes.object.isRequired,
  openAdvertiseModal: PropTypes.func
};

AdvertiseTableToobar = withStyles(toolbarStyles)(AdvertiseTableToobar);

AdvertiseTableHead.propTypes = {
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
    minHeight: 300
  },
  tableWrapper: {
    overflowX: 'auto',
    minHeight: 300
  },
  input: {
      display: 'none'
  },
  progress: {
    zIndex: 2000,
    position: 'absolute',
    top: '50%',
    left: '46%',
  },
  tableCellCenter: {
    textAlign:"center"
  },
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
});

class AdvertiseTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: '',
    advertises: [],
    page: 0,
    rowsPerPage: 5,
    isOpened: false,
    nPriority: 0,
    nExpired: Date("dd/mm/yyyy"),
    nStatus: 'Active',
    index: 0,
    total_count: 0,
    snackOpen: false,
    snackError: false,
    message: '',
    isAlertOpen: false,
    changedStatus: '',
    selectedId: 0,
    dialogTitle: '',
    dialogContent: '',
    isLoading: true,
    image_path: '',
    selected_file: null
  };

  componentWillMount() {
    // api start
    // this.getAllAdvertise();
  }

  getAllAdvertise = () => {
    let temp = {
      offset: this.state.index,
      limit: this.state.rowsPerPage,
      sort_field: this.state.orderBy,
      sort_dir: this.state.order
    }
    this.setState({isLoading: true});
    get_all_advertises(temp, (response) => {
        if (typeof(response.data) != 'undefined') {
          this.setState({advertises: response.data.advertises});
          this.setState({total_count: response.data.total});
          this.setState({isLoading: false});
        }
        else {
          this.getAllAdvertise();
        }
    });
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    if (orderBy == 'action' || orderBy == 'img_url') {
      return;
    }
    this.state.orderBy = orderBy
    if (this.state.order == 'asc') {
      this.state.order = 'desc';
    }
    else {
      this.state.order = 'asc';
    }
    // sort reload table
    this.getAllAdvertise();
  };

  handleChangePage = (event, page) => {
    // this.setState({ page });
    this.state.index = page;
    // change the offset and get data
    this.getAllAdvertise();
  };

  handleChangeRowsPerPage = event => {
    // this.setState({ rowsPerPage: event.target.value });
    this.state.rowsPerPage = event.target.value;
    // change the limit count and get data
    this.getAllAdvertise();
  };

  activeAdvertise = (el, id) => {
      if (el.target.innerHTML == 'Active') {
        this.state.changedStatus = 'Active';
        this.setState({dialogTitle: 'Active'});
        this.setState({dialogContent: 'Are you sure to active this advertise?'});
      }
      else {
        this.setState({dialogTitle: 'Suspend'});
        this.setState({dialogContent: 'Are you sure to suspend this advertise?'});
        this.state.changedStatus = 'None';
      }
      this.state.selectedId = id;
      this.setState({isAlertOpen: true});
  }

  openAdvertiseModal = () => {
      this.setState({isOpened: true});
  }

  handleClose = () => {
      this.setState({isOpened: false});
  }

  addAdvertise = () => {
      
      let adver = {
          status: this.state.nStatus,
          expired: this.state.nExpired,
          priority: this.state.nPriority,
          advertise_image: this.state.selected_file
      }

      if (this.state.image_path == '' || this.state.nExpired == '') {
        return;
      }

      // api add_advertise
      this.setState({nStatus: 'Active'});
      this.setState({nExpired: Date()});
      this.setState({nPriority: 0});
      this.setState({image_path: ''});
      this.setState({isOpened: false});

      add_advertise(adver, (response) => {
        if (typeof(response.data) != 'undefined') {
          this.setState({message: response.data.msg});
          if (response.data.success == true) {
            this.setState({snackError: false});
          }
          else {
            this.setState({snackError: true});
          }
          this.setState({snackOpen: true});
        }
      });

      // reload table
      this.getAllAdvertise();
  }

  handleCloseSnackbar = () => {
    this.setState({snackOpen: false});
  }

  changeAdvertiseImage = (element) => {
    var file = element.target.files[0];
    if (file) {
      var formData = new FormData();
      formData.append('file', file);
      this.setState({selected_file: formData});
      this.setState({image_path: URL.createObjectURL(file)});
    }
  }

  handleExpiredChanged = event => {
      this.setState({nExpired: event.target.value});
  }

  handleStatusChanged = event => {
    this.setState({nStatus: event.target.value});
  }

  handlePriorityChanged = event => {
      if (typeof(Number(event.target.value)) != 'number') {
          this.setState({nPriority: 0});
      }
      else {
          this.setState({nPriority: event.target.value});
      }
  }

  handleAlertClose = () => {
    this.setState({isAlertOpen: false});
  }

  handleDialogAction = () => {
    let temp = {
      id: this.state.selectedId,
      status: this.state.changedStatus
    }
    this.setState({isAlertOpen: false});
    update_advertise_status(temp, (response) => {
      if (typeof(response.data) != 'undefined') {
        this.state.message = response.data.msg;
        if (response.data.success == true) {
          this.state.snackError = false;
        }
        else {
          this.state.snackError = true;
        }
        this.setState({snackOpen: true});
      }
    });
  }


  render() {
    const { classes } = this.props;
    const { advertises, order, orderBy, selected, rowsPerPage, page, total_count, nStatus, nPriority, nExpired } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, advertises.length - page * rowsPerPage);

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
          open={this.state.isAlertOpen}
          onClose={this.handleAlertClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.state.dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">{this.state.dialogContent}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="raised" onClick={this.handleAlertClose} color="secondary">
              Cancel
            </Button>
            <Button variant="raised" onClick={this.handleDialogAction} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.state.isOpened}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title" fullWidth
            >
            <DialogTitle id="form-dialog-title">Add Advertise</DialogTitle>
            <DialogContent>
                <div className ="add-store-item-wrapper">
                    <span className="add-store-img-item-left">Advertise Image :</span>
                    <div className="row">
                    <input accept="image/*" className={classes.input} onChange={(el) => this.changeAdvertiseImage(el)} id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                        <ButtonBase
                          focusRipple
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
                              backgroundImage: `url(${this.state.image_path})`,
                            }}
                          />
                        </ButtonBase>
                    </label>
                    </div>
                </div>
                <div className="add-store-item-wrapper">
                    <span className="add-store-item-left">Expired Time :</span>
                    <TextField
                        id="date"
                        type="date"
                        defaultValue={nExpired}
                        className="add-store-item-right no-margin"
                        onChange={this.handleExpiredChanged}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div className ="add-store-item-wrapper">
                    <span className="add-store-item-left">Priority :</span>
                    <TextField 
                        margin = "normal"
                        id = "priority"
                        type="number"
                        placeholder = "Input the Priority"
                        className = "add-store-item-right no-margin"
                        value = {nPriority}
                        onChange = {this.handlePriorityChanged}
                        fullWidth
                    />
                </div>
                <div className ="add-store-item-wrapper">
                    <span className="add-store-item-left">Status :</span>
                    <Select
                        className="add-store-item-right no-margin"
                        value={nStatus}
                        onChange={this.handleStatusChanged}
                    >
                        <MenuItem value="Active" key="Active">Active</MenuItem>
                        <MenuItem value="None" key="None">None</MenuItem>
                    </Select>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="secondary" variant="raised"> Cancel </Button>
                <Button onClick={this.addAdvertise} color="primary" variant="raised">Add</Button>
            </DialogActions>
            </Dialog>
        <AdvertiseTableToobar openAdvertiseModal={this.openAdvertiseModal} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <AdvertiseTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={total_count}
            />
            <TableBody>
              {advertises
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n, index) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={this.state.index*this.state.rowsPerPage+index+1}
                    >
                      <TableCell className={classes.tableCellCenter} width={50}>{this.state.index*this.state.rowsPerPage+index+1}</TableCell>
                      <TableCell component="th" scope="row" className={classes.tableCellCenter}>
                        <img width="80" height="80" src={`static/images/unsplash/${n.img_url}`} />
                      </TableCell>
                      <TableCell className={classes.tableCellCenter}>{n.expired_time}</TableCell>
                      <TableCell numeric>{n.priority}</TableCell>
                      <TableCell className={classes.tableCellCenter}>{n.status}</TableCell>
                      <TableCell className={classes.tableCellCenter}>
                        {(n.status=='Active'
                            ? <Button variant="raised" color="secondary" onClick={(el) => this.activeAdvertise(el, n.id)}>Suspend</Button>
                            : <Button variant="raised" color="primary" onClick={(el) => this.activeAdvertise(el, n.id)}>Active</Button>
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

AdvertiseTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdvertiseTable);
