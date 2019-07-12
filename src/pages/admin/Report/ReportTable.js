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
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import {get_all_reports} from "../../../apis/admin";


const rows = [
  {id: 'index', numeric: false, disablePadding: false, label: 'No', sorting: false},
  { id: 'username', numeric: false, disablePadding: true, label: 'UserName', sorting: true },
  { id: 'store_name', numeric: false, disablePadding: true, label: 'StoreName', sorting: true },
  { id: 'content', numeric: false, disablePadding: false, label: 'Content', sorting: true },
  { id: 'created_at', numeric: false, disablePadding: false, label: 'Created', sorting: true }
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
  },
  rightArea: {
    display: 'block',
    float: 'right',
    marginTop: '6px'
  }
});

class ReportTableToolbar extends React.Component {

  render() {
    const { classes, searchReport } = this.props;
    return (
      <Toolbar
        className={classNames(classes.root)}
      > 
        <div className={classes.searchWrapper}>
          <div className={classes.rightArea}>
            <Button variant="raised" color="secondary">Export</Button>
          </div>
          <form className={classes.searchForm}>
            <IconButton
              aria-label="Search"
              className={classes.searchIcon}
            >
              <SearchIcon />
            </IconButton>
            <input className={classes.searchInput} type="text" placeholder="Search" autoFocus={true} onChange={(e) => this.props.searchReport(e)} />
          </form>
        </div>
      </Toolbar>
    );
  }
};

ReportTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  searchReport: PropTypes.func
};

ReportTableToolbar = withStyles(toolbarStyles)(ReportTableToolbar);

class ReportTableHead extends React.Component {
  createSortHandler = property => event => {
    if (property.sorting == false){
      return;
    }
    this.props.onRequestSort(event, property.id);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

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

ReportTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
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
  tableCellCenter: {
    textAlign: 'center'
  }
});

class ReportTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: '',
    selected: [],
    reports: [],
    page: 0,
    rowsPerPage: 5,
    total_count: 0,
    search_key: '',
    index: 0
  };

  componentWillMount(){
    // api start
    // this.getAllReports();
  }

  handleRequestSort = (event, property) => {
    if (property == 'content') {
      return;
    }
    else {
      this.state.orderBy = property;
      if (this.state.order == 'asc') {
        this.state.order = 'desc';
      }
      else {
        this.state.order = 'asc';
      }
      // sort reload table
      this.getAllReports();
    }
  };

  handleChangePage = (event, page) => {
    // this.setState({ page });
    this.state.index = page;
    this.getAllReports();
  };

  handleChangeRowsPerPage = event => {
    // this.setState({ rowsPerPage: event.target.value });
    this.state.rowsPerPage = event.target.value;
    this.getAllReports();
  };

  searchReport = (element) => {

    /*
    * api get_sellers_by_name
    * params searchKey(string)
    * return sellers(array)
    */
    let str_search = element.target.value;
    this.state.search_key = str_search;
    // reload table
    this.getAllReports();
  }

  getAllReports = () => {
    /*
    * api get_all_reports
    * params none
    * return all reports(array)
    */
    let temp = {
      offset: this.state.index,
      limit: this.state.rowsPerPage,
      search_key: this.state.search_key,
      sort_field: this.state.orderBy,
      sort_dir: this.state.order
    }
    get_all_reports(temp, (response) => {
      if (typeof(response.data) != 'undefined') {
        this.setState({reports: response.data.reports});
        this.setState({total_count: response.data.total});
      }
    });
  }


  render() {
    const { classes } = this.props;
    const { order, orderBy, selected, rowsPerPage, page, reports, total_count } = this.state;
    return (
      <Paper className={classes.root}>
        <ReportTableToolbar searchReport={this.searchReport}/>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <ReportTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={total_count}
            />
            <TableBody>
              {this.state.reports
                .map((n, index) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={this.state.index*this.state.rowsPerPage+index+1}
                    >
                      <TableCell className={classes.tableCellCenter}>{this.state.index*this.state.rowsPerPage+index+1}</TableCell>
                      <TableCell className={classes.tableCellCenter}>
                        <NavLink color="primary" to={`/user/${n.id}`}>{n.user.username}</NavLink>
                      </TableCell>
                      <TableCell className={classes.tableCellCenter}>{n.store.store_name}</TableCell>
                      <TableCell className={classes.tableCellCenter}>{n.content}</TableCell>
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

ReportTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReportTable);
