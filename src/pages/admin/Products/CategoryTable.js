import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Snackbar from "@material-ui/core/Snackbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import { get_all_categories, add_category, update_category, delete_category, get_all_parent_categories } from "../../../apis/admin";

const rows = [
  {id: 'id', numeric: false, disablePadding: false, label: 'No', sorting: false},
  { id: 'parent', numeric: false, disablePadding: true, label: 'Parent Name', sorting: true },
  { id: 'name', numeric: false, disablePadding: false, label: 'Category Name', sorting: true },
  { id: 'action', numeric: false, disablePadding: false, label: 'Action', sorting: false }
];

let pCategories = [];

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
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  formControlSelect: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  buttonGroup:{
    display: "inline-flex",
    width: 120,
  },
  xFormControlSelect: {
    margin: theme.spacing.unit,
    minWidth: 100
  },
  marginLeft_5: {
    marginLeft: 5
  },
  categoryForm: {
    float: 'right'
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

class CategoryTableHead extends React.Component {
  createSortHandler = property => event => {
    if (property.sorting == false){
      return;
    }
    this.props.onRequestSort(event, property.id);
  };

  render() {
    const { order, orderBy, numSelected } = this.props;

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

CategoryTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  }
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

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
  tableCellCenter: {
    textAlign:"center"
  }
});


class CategoryTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: '',
    selected: [],
    categories: [],
    selected_category: 0,
    new_category: '',
    category_id: 0,
    isOpen: false,
    snackOpen: false,
    message: '',
    snackError: false,
    selectedCategoryType: '',
    addOpened:false,
    deleteOpen:false,
    edittingCell:{
      name:"",
      id:"",
      updatable:false
    }
  };

  componentWillMount() {
    this.getAllCategories();

    get_all_parent_categories((response) => {
      if (typeof(response.data) != 'undefined') {
        this.setState({parentCategories: response.data});
      }
    });
  }

  getAllCategories = () => {

    /*
    * api get_all_categories
    * params none
    * return all categories(array)
    */
    let temp = {
      search_key: this.state.search_key,
      sort_field: this.state.orderBy,
      sort_dir: this.state.order,
      offset: this.state.index,
      limit: this.state.limit,
    }
    
    // read api
    get_all_categories(temp, (response) => {
      if (typeof(response.data) != 'undefined') {
        this.setState({categories: response.data.categories});
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
    this.getAllCategories();
  };

  handleChangePage = (event, page) => {    
    // this.setState({ page: 0 });
    this.state.index = page;
    this.getAllCategories();
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
    this.state.limit = event.target.value;
    this.getAllCategories();
  };

  selectParentCategory = (element) => {
    this.setState({selected_category: element.target.value});
  }

  searchCategory = (element) => {

    let str_search = element.target.value;
    this.state.search_key = str_search;
    this.getAllCategories();
  }

  addCategory = (element) => {
    if(this.state.new_category == '') {
      this.setState({requiredError: true});
      return;
    }
    else {
      this.setState({requiredError: false});
    }
    
      element.preventDefault();
      let temp = {
        name: this.state.new_category,
        parent_id: this.state.selected_category
      }
      
      // add api
      add_category(temp, (response) => {
        if (typeof(response.data) != 'undefined') {
          if (response.data.success == true) {
            this.setState({snackError: false});
            this.setState({message: response.data.msg});
            this.setState({snackOpen: true});
          }
          else {
            this.setState({snackError: true});
            this.setState({message: response.Error});
            this.setState({snackOpen: true});
          }
          this.setState({new_category: ''});
          this.setState({selected_category: 0});
          this.setState({category_type: 'ITEM'});
          this.getAllCategories();
        }
      });
    
  }

  selectCategoryType = (element) => {
    // this.setState({category_type: element.target.value});
    // let temp = [];
    // pCategories.map(value => {
    //   if (value.cate_type == element.target.value) {
    //     temp.push(value);
    //   }
    // });
    // this.setState({parentCategories: temp});
  }

  changeCategoryField = (element) => {
    this.setState({requiredError: false});
    let str = element.target.value;
    this.setState({new_category: str});
  }

  editCategory = (element, category) => {

    this.setState({edit_flag: true});
    this.setState({category_id: category.id});
    this.setState({new_category: category.name});
    this.setState({category_type: category.cate_type});
    if (category.parent != 0) {
      this.setState({selected_category: category.parent.id});
    }
    else {
      this.setState({selected_category: category.parent});
    }
  }

  updateCategory = (element) => {
    if (this.state.edittingCell.id != 0) {
      // update api
      update_category(this.state.edittingCell, (response) => {
        if (typeof(response.data) != 'undefined') {
          if (response.data.success == true) {
            this.setState({snackError: false});
            this.setState({message: response.data.msg});
            this.setState({snackOpen: true});
          }
          else {
            this.setState({snackError: true});
            this.setState({message: response.data.msg});
            this.setState({snackOpen: true});
          }
        }
      });
    }
  }

  cancelCategory = (element) => {
    this.setState({edit_flag: false});
    this.setState({selected_category: 0});
    this.setState({new_category: ''});
  }

  openDeleteDialog = (element, category_id) => {
    this.setState({category_id: category_id});
    this.setState({isOpen: true});
  }

  handleDialogAction = () => {
    if (this.state.category_id != 0) {
      let temp = {
        id: this.state.category_id
      }
      delete_category(temp, (response) => {
        if(response.data){
          if (response.data.success == true) {
              this.setState({snackError: false});
              this.setState({message: response.data.msg});
              this.setState({snackOpen: true});
            }else {
              this.setState({snackError: true});
              this.setState({message: response.data.msg});
              this.setState({snackOpen: true});
            }
            this.getAllCategories();
        }
      });
    }
    this.setState({isOpen: false})
    
  }

  handleClose = () => {
    this.setState({isOpen: false});
  }

  handleCloseSnackbar = () => {
    this.setState({snackOpen: false});
  }

  handleKeyPress = event => {
    if (event.key == 'Enter') {
      if (this.state.edit_flag == true) {
        this.addCategory();
      }
      else {
        this.updateCategory();
      }
    }
  }

  handleChangeCateType = (event, value) => {
    this.state.cateType = value;
    this.setState({cateType: value});
    this.getAllCategories();
  }
  

  dbClickCategory = (name, id) => {
    if(parseInt(this.state.edittingCell.id) > 0 && this.state.edittingCell.updatable){
      update_category(this.state.edittingCell, (response) => {
        if (typeof(response.data) != 'undefined') {
          if (response.data.success == true) {
            this.setState({snackError: false});
            this.setState({message: response.data.msg});
            this.setState({snackOpen: true});
          }
          else {
            this.setState({snackError: true});
            this.setState({message: response.data.msg});
            this.setState({snackOpen: true});
          }
        }
      });
    }
    this.setState({edittingCell:{name:name, id:id, updatable:false}});
  }

  onChangeEdittingCategory = (e, category, i, k)=>{
    e.preventDefault();
    category.name = e.target.value;
    if(k != undefined){
      this.state.categories[i].children[k].name = e.target.value;
    }else{
      this.state.categories[i].name = e.target.value;
    }
    this.setState({edittingCell:{name:category.name, id:category.id,updatable:true}});
    this.forceUpdate()
  }

  renderCell = (category, i, k) =>{
    if(category.id != this.state.edittingCell.id){
      return category.name;
    }else{
      return (
        <TextField required={true} value={category.name} onChange={(e) => this.onChangeEdittingCategory(e, category, i, k)}/>
      )
    }
  }

  cancelEdit = ()=>{
    this.setState({edittingCell:{name:'', id:'', updatable:false}});
  }

  saveCategory = (el)=>{
    this.updateCategory(el);
    this.setState({edittingCell:{name:'', id:'', updatable:false}});
  }

  renderActionButton = (parent, child, cI, classes) =>{

    if(parent.id != this.state.edittingCell.id){
      if(child){
        if(child.id != this.state.edittingCell.id){
          return (<Button variant="raised" color="secondary" className={classes.marginLeft_5} onClick={(el) => this.openDeleteDialog(el, child.id)}>Delete</Button>)    
        }
      }else{
        return (<Button variant="raised" color="secondary" className={classes.marginLeft_5} onClick={(el) => this.openDeleteDialog(el, parent.id)}>Delete</Button>)
      }
    }

    if(cI == 0){
      return (
        <div>
        <Button variant="raised" color="secondary" className={classes.marginLeft_5} onClick={(el) => this.cancelEdit()}>Cancel</Button>
        <Button variant="raised" color="primary" className={classes.marginLeft_5} onClick={(el) => this.saveCategory()}>Save</Button>
        </div>
      )
    }else{
      if(child.id == this.state.edittingCell.id){
        return (
          <div>
          <Button variant="raised" color="secondary" className={classes.marginLeft_5} onClick={(el) => this.cancelEdit()}>Cancel</Button>
          <Button variant="raised" color="primary" className={classes.marginLeft_5} onClick={(el) => this.saveCategory()}>Save</Button>
          </div>
        )
      }else{
        return (<Button variant="raised" color="secondary" className={classes.marginLeft_5} onClick={(el) => this.openDeleteDialog(el, child.id)}>Delete</Button>)
      }
      
    }
    
  }

  onClckAddButton = ()=>{
    this.setState({addOpened:true});
  }

  handleAddClose= ()=>{
    this.setState({addOpened:false});
  }

  render() {
    const { classes } = this.props;
    const { categories, order, orderBy, selected, rowsPerPage, page, total_count, category_id, category_type } = this.state;
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
          <MySnackbarContentWrapper
            onClose={this.handleCloseSnackbar}
            variant={this.state.snackError == false ? 'success' : 'error'}
            message={this.state.message}
          />
        </Snackbar>

        <Dialog
          open={this.state.addOpened}
          onClose={this.handleAddClose}
          aria-labelledby="form-dialog-title"
          >
          <DialogTitle id="form-dialog-title">Add Category</DialogTitle>
          <DialogContent>

              <FormGroup className={classes.formGroup}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="parent-category">Parent Category</InputLabel>
                  <Select
                      value={(this.state.selected_category)}
                      fullWidth
                      label="Parent Category"
                      onChange={this.selectParentCategory}
                      input={<Input id="parent-category" />}
                  >
                  <MenuItem value={0} key={0}></MenuItem>
                  {this.state.categories.map((cate, index)=>{
                    return (<MenuItem value={cate.id} key={cate.id}>{cate.name}</MenuItem>)
                  })}
                  </Select>
                </FormControl>
              </FormGroup>

              <FormGroup className={classes.formGroup}>
                <FormControl className={classes.formControl}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Category Name"
                  fullWidth
                  value={this.state.new_category}
                  onChange={this.changeCategoryField}
                />
                </FormControl>
              </FormGroup>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleAddClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.addCategory} color="primary">
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
        
        <Dialog
          open={this.state.isOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Warning</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">Are your sure to delete this category?</DialogContentText>
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

        <Grid container justify="space-between" className={classes.root}>
          <Grid item xs={6}>
          </Grid>
          <Grid item>
              <Button variant="raised" color="primary" style = {{margin:'5px'}} onClick={this.onClckAddButton}>Add</Button>
          </Grid>
        </Grid>

        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <CategoryTableHead
              numSelected={selected.length}
              onRequestSort={this.handleRequestSort}
              orderBy={orderBy}
              order={order}
            />
            <TableBody>
              {
                categories
                .map((n, index) => {
                  const noInx = index+1;
                  if(n.children.length == 0){
                    return (
                      <TableRow
                        hover
                        tabIndex={1}
                        key={n.id}>
                        <TableCell className={classes.tableCellCenter}>{noInx}</TableCell>
                        <TableCell className={classes.tableCellCenter} onDoubleClick={(el) => this.dbClickCategory(n.name, n.id)}>{this.renderCell(n, index)}</TableCell>
                        <TableCell className={classes.tableCellCenter}></TableCell>
                        <TableCell className={classes.tableCellCenter}>{this.renderActionButton(n, null,0, classes)}</TableCell>
                      </TableRow>
                    );
                  }
                  return n.children.map((child, cI) => {
                    return (
                      <TableRow
                        hover
                        tabIndex={1}
                        key={child.id}
                      >
                        <TableCell className={classes.tableCellCenter}>{(cI == 0)?noInx:""}</TableCell>
                        <TableCell className={classes.tableCellCenter} onDoubleClick={(el) => this.dbClickCategory(n.name, n.id)}>{(cI == 0)?this.renderCell(n, index):""}</TableCell>
                        <TableCell className={classes.tableCellCenter} onDoubleClick={(el) => this.dbClickCategory(child.name, child.id)}>{this.renderCell(child, index, cI)}</TableCell>
                        <TableCell className={classes.tableCellCenter}>{this.renderActionButton(n, child, cI, classes)}</TableCell>
                      </TableRow>
                    );
                  })
                })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    );
  }
}

CategoryTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CategoryTable);
