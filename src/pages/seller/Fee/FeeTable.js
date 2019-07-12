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

import SearchIcon from '@material-ui/icons/Search';

import { CustomSnack } from '../../../components';
import Snackbar from "@material-ui/core/Snackbar";


import { get_all_fee , update_fee_by_id, delete_fee_by_id, add_fee} from '../../../apis/seller';

const rows = [
  { id: 'no', numeric: false, disablePadding: false, label: 'No' ,sorting: false},
  { id: 'fee_country', numeric: false, disablePadding: false, label: 'Country' ,sorting: true},
  { id: 'fee_city', numeric: false, disablePadding: false, label: 'City' ,sorting: true},
  { id: 'fee_price', numeric: true, disablePadding: false, label: 'Price' ,sorting: true},
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


class FeeTableToobar extends React.Component {

  render() {
    const { classes, searchFee, addFeelocation } = this.props;
    return (
      <Toolbar
        className={classNames(classes.root)}
      >
        <div className={classes.title}>
        </div>
        
        <div className={classes.searchWrapper}>
          <div>
            <div className = "add-button">
              <Button variant="raised" color="secondary" fullWidth type="submit" onClick={() => this.props.addFeelocation()}>Add</Button>
            </div>
            <form className={classes.searchForm}>
              <IconButton
                aria-label="Search"
                className={classes.searchIcon}
              >
                <SearchIcon />
              </IconButton>
              <input className={classes.searchInput} type="text" placeholder="Search" autoFocus={true} onChange={(e) => this.props.searchFee(e)} />
            </form>
          </div>
        </div>
      </Toolbar>
    );
  }
};

FeeTableToobar.propTypes = {
  classes: PropTypes.object.isRequired,
  searchFee: PropTypes.func,
  addFeelocation: PropTypes.func,
};

FeeTableToobar = withStyles(toolbarStyles)(FeeTableToobar);

class FeeHead extends React.Component {
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

FeeHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


const styles = theme => ({
  root: {
    width: '100%',
  },
  table: {
    minWidth: 930,
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
// made by somi

class FeeTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'id',
    data: [],
    page: 0,
    rowsPerPage: 5,
    isOpened: false,
    selected_id:0,
    selected_country: '',
    selected_price: '',
    table_title: '',
    search_key: '',
    total: 0,
    snackOpen: false,
    snackError: false,
    message: '',
    isdelected: false
  };
  componentWillMount() {
    this.getAllFee();
  }

  getAllFee = () => {
    var fee_data = {
      'offset': this.state.page,
      'limit': this.state.rowsPerPage,
      'sort_field': this.state.orderBy,
      'sort_dir': this.state.order,
      'search_key': this.state.search_key
    }

    get_all_fee(fee_data, (response) => {
      if (typeof(response.data) != 'undefined') { 
        var result = response.data;
        this.setState({data: result.fee_data});
        this.setState({total: result.total});
      }
    });
  }
  handleRequestSort = (event, property) => {
    const orderBy = property;
    if (orderBy == 'action')
      return;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    this.state.order = order;
    this.state.orderBy = orderBy;
    this.getAllFee();
  };

  searchFlocation = (element) => {
		let str_search = element.target.value;
    this.state.search_key = str_search;
    this.getAllFee();
  }


  Edithandle = (data) => { 
    this.setState({table_title: 'Edit'});
    this.setState({ isOpened: true });
    this.setState({ selected_id : data.n.id});
    this.setState({ selected_country: data.n.fee_country});
    this.setState({ selected_city: data.n.fee_city});
    this.setState({ selected_price: data.n.fee_price});
  };
  handleClose = () => {  
    this.setState({ isOpened: false });
  };
  Deletehandle = (id) => {
    this.setState({selected_id: id}); 
    this.setState({isdelected: true});
  };

  handleChangePage = (event, page) => {
    this.state.page = page;
    this.getAllFee();
  };

  handleChangeRowsPerPage = event => {
    this.state.rowsPerPage = event.target.value;
    this.getAllFee();
  };
  validation = () => {
    if (this.state.selected_country == '') {
      this.setState({snackError: true});
			this.setState({snackOpen: true});
      this.setState({message: 'please input country name.'});
      return false;
    }
    if (this.state.selected_city == '') {
      this.setState({snackError: true});
			this.setState({snackOpen: true});
      this.setState({message: 'please input city name.'});
      return false;
    }
    if (this.state.selected_price == 0) {
      this.setState({snackError: true});
			this.setState({snackOpen: true});
      this.setState({message: 'please input price.'});
      return false;
    }
    return true;
  }

  handleEditorAddClick = (e) => {
    /*if (!this.validation()) {  // Check validation with notification
      this.setState({isOpened: true});
    } else {
      this.setState({isOpened: false});
      if (this.state.table_title == "Add") {
        let data = {
          'fee_country': this.state.selected_country,
          'fee_city' : this.state.selected_city,
          'fee_price': this.state.selected_price
        }  
        add_fee(data, (response)=> {
          var result = response.data;
          this.setState({message: result.msg});
          if (result.success) {
            this.setState({snackError: false});
            this.getAllFee();
          } else {
            this.setState({snackError: true});
          }
          this.setState({snackOpen : true});
        })
      } else if (this.state.table_title == "Edit") {
        let data = {
          'id': this.state.selected_id,
          'fee_country': this.state.selected_country,
          'fee_city' : this.state.selected_city,
          'fee_price': this.state.selected_price
        }
        update_fee_by_id(data, (response)=> {
          var result = response.data;
          this.setState({message: result.msg});
          if (result.success) {
            this.setState({snackError: false});
            this.getAllFee();
          }
          this.setState({snackOpen : true});
        })
      }
    }*/

    if (this.state.selected_country == '' || this.state.selected_city == "" || this.state.selected_price == 0) { // Check validation with only required
      
      return;
    } else {
      e.preventDefault();
      this.setState({isOpened: false});
      if (this.state.table_title == "Add") {
        let data = {
          'fee_country': this.state.selected_country,
          'fee_city' : this.state.selected_city,
          'fee_price': this.state.selected_price
        }  
        add_fee(data, (response)=> {
          var result = response.data;
          this.setState({message: result.msg});
          if (result.success) {
            this.getAllFee();
          }
        })
      } else if (this.state.table_title == "Edit") {
        let data = {
          'id': this.state.selected_id,
          'fee_country': this.state.selected_country,
          'fee_city' : this.state.selected_city,
          'fee_price': this.state.selected_price
        }
        update_fee_by_id(data, (response)=> {
          var result = response.data;
          this.setState({message: result.msg});
          if (result.success) {            
            this.getAllFee();
          }
        })
      }
    }
  }
  

  handleCountryChanged = event => {
    this.setState({selected_country: event.target.value});
  }
  handleCityChanged = event => {
    this.setState({selected_city: event.target.value});
  }
  handlePricechanged = event => {
    this.setState({selected_price: event.target.value});
  }
  handleCloseSnackbar = () => {
    this.setState({snackOpen: false});
  }
  DeleteDialogAccept = () => {
    this.setState({isdelected: false});
		delete_fee_by_id(this.state.selected_id, (response) => {
			var result = response.data;
			this.setState({message: result.msg});
			if(result.success) {
				this.setState({snackError: false});
				this.getAllFee();//refresh
			}
			this.setState({snackOpen: true});
		});
    this.setState({isdelected: false});
  }
  DeleteDialogClose = () => {
    this.setState({isdelected: false});
  }
  AddHandle = event => {//add clicked
    this.setState({table_title: 'Add'});
    this.setState({isOpened : true});
    this.setState({selected_country: ""});
    this.setState({selected_city: ""});
    this.setState({selected_price: 0});
  }
  render() {
    const { classes } = this.props;
    const { data, order, orderBy, rowsPerPage, page,isOpened } = this.state;
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
          <FeeTableToobar searchFee={this.searchFlocation} addFeelocation = {this.AddHandle}/>
          <div className={classes.tableWrapper}>
            <Dialog
                open={this.state.isOpened}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                >
                <form>
                  <DialogTitle id="form-dialog-title">{this.state.table_title}</DialogTitle>
                  <DialogContent>
                    <FormGroup className={classes.formGroup}>
                      <FormControl className={classes.formControl} fullWidth>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="name"
                          label="Country"
                          fullWidth
                          value={this.state.selected_country}
                          onChange={this.handleCountryChanged}
                          required = {true}
                        />
                      </FormControl>
                    </FormGroup>
                    <FormGroup className={classes.formGroup}>
                      <FormControl className={classes.formControl} fullWidth>
                        <TextField
                          margin="dense"
                          type="text"
                          id="name"
                          label="City"
                          fullWidth
                          value={this.state.selected_city}
                          onChange={this.handleCityChanged}
                          required = {true}
                        />
                      </FormControl>
                    </FormGroup>
                    <FormGroup className={classes.formGroup}>
                      <FormControl className={classes.formControl} fullWidth>
                        <TextField
                          margin="dense"
                          id="name"
                          label="Price"
                          type="number"
                          fullWidth
                          value = {this.state.selected_price}
                          onChange={this.handlePricechanged}
                          required = {true}
                        />
                      </FormControl>
                    </FormGroup>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="secondary">
                      Cancel
                    </Button>
                    <Button type="submit" onClick={(el) => {this.handleEditorAddClick(el)}} color="primary">
                      {this.state.table_title}
                    </Button>
                  </DialogActions>
                </form>
            </Dialog>

            <Dialog
							open={this.state.isdelected}
							aria-labelledby="responsive-dialog-title"
							>
							<DialogTitle id="responsive-dialog-title">WARNING !!!</DialogTitle>
							<DialogContent>
								<DialogContentText>
									It will be not use after. Do you want to delete?
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button onClick={this.DeleteDialogAccept} color="primary" variant="raised" type="submit">
								Ok
								</Button>
								<Button onClick={this.DeleteDialogClose} color="secondary" variant="raised" type="submit">
								Cancel
								</Button>
							</DialogActions>
						</Dialog>

            <Table className={classes.table} aria-labelledby="tableTitle">
              <FeeHead
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {data
                  .map((n, idx) => {
                    return (
                      <TableRow key={n.id}>
                        <TableCell className={classes.tableCellCenter}>
                            <span>{(page * rowsPerPage) + idx + 1}</span>
                        </TableCell>

                        <TableCell className={classes.tableCellCenter}>
                              {n.fee_country}
                        </TableCell>

                        <TableCell className={classes.tableCellCenter}>
                              {n.fee_city}
                        </TableCell>

                        <TableCell numeric>
                               $&nbsp;{n.fee_price}
                        </TableCell>

                        <TableCell className={classes.tableCellCenter} >
                          <div className="fee-button-cell">
                            <Button variant="raised" color="primary" fullWidth type="submit" onClick={() => this.Edithandle({n})}>Edit</Button>&nbsp;&nbsp;
                            <Button variant="raised" color="secondary" fullWidth type="submit" onClick={() => this.Deletehandle(n.id)}>Delete</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
      </div>
      
    );
  }
}

FeeTable.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(FeeTable);
