import React, { Component } from 'react';
import { Bar, Bubble,Line } from 'react-chartjs-2';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalOfferIcon from '@material-ui/icons/ThumbUp';
import PhoneIcon from '@material-ui/icons/Phone';
import NotificationsIcon from '@material-ui/icons/Notifications';
import EmailIcon from '@material-ui/icons/Email';
import SettingsIcon from '@material-ui/icons/Settings';
import MoreIcon from '@material-ui/icons/More';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Wrapper, StatCard } from '../../../components';
import { get_visitAndlikeCount } from '../../../apis';
import { connect } from 'react-redux';
import { get_all_order } from '../../../apis';
import { get_all_month_data , get_all_day_data, get_all_year_data} from '../../../apis/seller';

class Home extends Component {
  state = {
    anchorEl: null,
    labels_year: [],
    labels_month: ['1','2','3','4','5','6','7','8','9','10','11','12'],
    labels_day: [],
    year_arr: [],
    month_arr: [],
    day_arr: [],
    following_count: 0,
    like_count: 0,
    today_visit:0 ,
    all_visit: 0,
    selected_year_forday : new Date().getFullYear(),
    selected_month : new Date().getMonth() + 1,
    selected_year_formonth: new Date().getFullYear(),
    order_data: [],
    line_day_arr: [],
    line_month_arr: [],
    line_year_arr: [],
  };
  
  
  colors = [{
      backgroundColor: '#7986cb',
      borderColor: '#3f51b5',
      pointBackgroundColor: '#3f51b5',
      pointBorderColor: '#fff'
    }, {
      backgroundColor: '#eeeeee',
      borderColor: '#e0e0e0',
      pointBackgroundColor: '#e0e0e0',
      pointBorderColor: '#fff'
    }, {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff'
  }];
  
  constructor(props) {
    super(props);
  }
  handleChangeYearInMonth = (e) => {
    this.setState({selected_year_formonth: e.target.value});
    this.getAllMonthData(e.target.value);
  }
  handleChangeYearInYear = (e) => {
    this.setState({selected_year_forday: e.target.value});
    var arr = this.showX(this.getAllDayFromMonth(e.target.value, this.state.selected_month));
    var temp = [];
    for (var i = 0 ; i < arr.length ; i++){
      var num = i + 1;
      var str = '' + num
      temp.push(str);
    }
    this.setState({labels_day: temp});
    this.getAllDayData(e.target.value, this.state.selected_month);
  }

  showX = (all_day) => {
    var label_arr =[];
    for (var i = 0 ; i< all_day ;i++) {
      label_arr.push(i + 1);
    }
    return label_arr;
  }
  handleChangeMonth = (e) => {
    this.setState({selected_month: e.target.value});
    var arr = this.showX(this.getAllDayFromMonth(this.state.selected_year_forday, e.target.value));
    var temp = [];
    for (var i = 0 ; i < arr.length ; i++){
      var num = i + 1;
      var str = '' + num
      temp.push(str);
    }
    this.setState({labels_day: temp});
    this.getAllDayData(this.state.selected_year_forday, e.target.value);
  }
  getDateDataFromServer = (current_year) => {
    var from_year = current_year - 10;
    var idx = 0;

    var temp_year = [];
    for (var i = from_year ; i < current_year ; i++) {
      temp_year.push(i + 1);
    }
    var temp_month = [];
    for (var i = 0 ; i < 12 ; i ++ ) {
      temp_month.push(i + 1);
    }
    this.setState({labels_year: temp_year});
    this.setState({year_arr: temp_year});
    this.setState({month_arr: temp_month});
  }
  getAllDayFromMonth = (year, month) => {
    var result = 0;
    if(month == 2) {
      if(year % 4 == 0) {
        result = 29;
      } else {
        result = 28;
      }
    } else {
        if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
          return 31;
        } else {
          result = 30;
        }
      }
    return result;
  }
  getAllDayData = (year,month) => {
    var obj = {
      year: year,
      month: month,
      count: this.getAllDayFromMonth(year, month)
    }
    get_all_day_data(obj, (response) => {
      if (typeof(response.data) != 'undefined') {
        this.setState({line_day_arr: response.data});
      }
    });
  }
  getAllMonthData = (year) => {
    var obj = {
      year: year
    }
    get_all_month_data(obj, (response) => {
      if (typeof(response.data) != 'undefined') { 
        this.setState({line_month_arr: response.data});
      }
    });
  }
  getAllYearData = (current_year) => {
     var obj = {
      year: current_year
    }
    get_all_year_data(obj, (response) => {
      if (typeof(response.data) != 'undefined') {
        this.setState({line_year_arr: response.data});
      }
    });
  }
  getData_start = (year) => {
    var count = this.getAllDayFromMonth(year , new Date().getMonth() + 1);
    var temp = [];
    for (var i =0 ; i < count ; i++){
      var num = i + 1;
      var str = '' + num
      temp.push(str);
    }
    this.setState({labels_day: temp});
  };
  componentDidMount() {
    // made by somi ---  this is data from server
    var time = new Date();
    var current_year = time.getFullYear();
    this.getDateDataFromServer(current_year);
    this.getData_start(current_year);
    this.getAllDayData(this.state.selected_year_forday, this.state.selected_month);
    this.getAllMonthData(this.state.selected_year_forday);
    this.getAllYearData(new Date().getFullYear());
    //
  }

  render() {
    const { anchorEl , year_arr, month_arr , line_day_arr , line_month_arr,line_year_arr,labels_day, labels_month , labels_year} = this.state;
    const lineData_perday = {
      labels_day,
      datasets: [{
          label: 'Total Amount Per Day',
          ...this.colors[0],
          borderWidth: 1,
          data: line_day_arr,
        }]
    };
    const lineData_permonth = {
      labels_month,
      datasets: [{
          label: 'Total Amount Per Month',
          ...this.colors[0],
          borderWidth: 1,
          data: line_month_arr,
        }]
    };
    const lineData_peryear = {
      labels_year,
      datasets: [{
          label: 'Total Amount Per Year',
          ...this.colors[0],
          borderWidth: 1,
          data: line_year_arr,
        }]
    };
    const options_day = {
      responsive: true,
      tooltips: {
        mode: 'label'
      },
      elements: {
        line: {
          fill: false
        }
      },
      scales: {
        xAxes: [{
          display: true,
          gridLines: {
            display: false
          },
          labels: labels_day,
        }],
        yAxes: [{
            type: 'linear',
            display: true,
            position: 'left',
            id: 'y-axis-1',
            gridLines: {
              display: false
            },
            labels: {
              show: false
            }
          }
        ]
      }
    };
    const options_month = {
      responsive: true,
      tooltips: {
        mode: 'label'
      },
      elements: {
        line: {
          fill: false
        }
      },
      scales: {
        xAxes: [{
          display: true,
          gridLines: {
            display: false
          },
          labels: labels_month,
        }],
        yAxes: [{
            type: 'linear',
            display: true,
            position: 'left',
            id: 'y-axis-1',
            gridLines: {
              display: false
            },
            labels: {
              show: false
            }
          }
        ]
      }
    };
    const options_year = {
      responsive: true,
      tooltips: {
        mode: 'label'
      },
      elements: {
        line: {
          fill: false
        }
      },
      scales: {
        xAxes: [{
          display: true,
          gridLines: {
            display: false
          },
          labels: labels_year,
        }],
        yAxes: [{
            type: 'linear',
            display: true,
            position: 'left',
            id: 'y-axis-1',
            gridLines: {
              display: false
            },
            labels: {
              show: false
            }
          }
        ]
      }
    };
    const sharedOptions = {
      maintainAspectRatio: true,
      responsive: true,
      legend: {
        display: false
      }
    };
    const gridOptions = {
      scales: {
        xAxes: [{
          gridLines: {
            color: 'rgba(0,0,0,0.02)',
            zeroLineColor: 'rgba(0,0,0,0.02)'
          }
        }],
        yAxes: [{
          gridLines: {
            color: 'rgba(0,0,0,0.02)',
            zeroLineColor: 'rgba(0,0,0,0.02)'
          },
          position: 'left',
          ticks: {
            beginAtZero: true,
            suggestedMax: 9
          }
        }]
      }
    }
    return (
      <Wrapper>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              type="fill"
              title="Following"
              value={this.state.following_count}
              icon={<LocalOfferIcon />}
              color="#3f51b5"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              type="fill"
              title="Like Count"
              value={this.state.like_count}
              icon={<PhoneIcon />}
              color="#9c27b0"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              type="fill"
              title="Today Visit"
              value={this.state.today_visit}
              icon={<NotificationsIcon />}
              color="#f44336"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              type="fill"
              title="All Visit"
              value={this.state.all_visit}
              icon={<EmailIcon />}
              color="#ffd740"
            />
          </Grid>
        </Grid>
        <Grid container spacing={8}>
          
        </Grid>
       
        <Grid container spacing={8}>
          <Grid item xs={12} sm={12} md={6} key="1">
            <Grid container spacing={8} className = "dash_day">
              <Grid item xs={12} sm={6} md={5} key="1_1">
                <div className="add-store-item-wrapper">
                  <span className="dashboard-item">Year :</span>
                  <Select
                      value={this.state.selected_year_forday}
                      onChange={this.handleChangeYearInYear}
                      className="dashboard-select no-margin"
                      fullWidth
                  >
                    {year_arr.map(n => (
                    <MenuItem
                            key={n}
                            value={n}
                        >{n}</MenuItem>
                    ))}
                  </Select>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={5} key="1_3">
              <div className="add-store-item-wrapper">
                <span className="dashboard-item">Month :</span>
                <Select
                    value={this.state.selected_month}
                    onChange={this.handleChangeMonth}
                    className="dashboard-select no-margin"
                    fullWidth
                >
                  {month_arr.map(n => (
                   <MenuItem
                          key={n}
                          value={n}
                      >{n}</MenuItem>
                  ))}
                </Select>
              </div>
            </Grid>
            </Grid>
            
            <div>
              <Line
                data={lineData_perday}
                height={200}
                options={options_day}
              />
            </div>
            
          </Grid>
          <Grid item xs={12} sm={12} md={6} key="2">
              <div className="add-store-item-wrapper">
                <span className ="dashboard-month-item">Year :</span>
                <Select
                    value={this.state.selected_year_formonth}
                    onChange={this.handleChangeYearInMonth}
                    className="dashboard-select no-margin"
                    fullWidth
                >
                  {year_arr.map(n => (
                  <MenuItem
                          key={n}
                          value={n}
                      >{n}</MenuItem>
                  ))}
                </Select>
              </div>
            <Bar
                data={lineData_permonth}
                height={200}
                options={options_month}
              />
          </Grid>
          <Grid item xs={12} sm={12} md={12} key="3">
            <Bar
                data={lineData_peryear}
                height={80}
                options={options_year}
              />
          </Grid>
        </Grid>
      </Wrapper>
    )
  }
}
const mapStateToProps = state => {
  return  {
    userinfo: state.auth.userinfo,
  };
}

export default connect(mapStateToProps, null)(Home);