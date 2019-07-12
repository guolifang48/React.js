import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import { Wrapper } from '../../../components';
import { formatPrice } from '../../../helpers';
import EcommerceDetailStyles from '../../../styles/EcommerceDetail';
import { get_store_by_id } from '../../../apis/seller';
import { getHostAddress } from '../../../apis/index';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Slider from '@material-ui/lab/Slider';

class StoreDetail extends Component {

  state = {
    tab: 0,
    store: {},
    category_name: '',
    owner: '',
    featured:0,
  };

  componentDidMount() {
    let store_id = this.props.match.params.id;
    get_store_by_id({store_id: store_id}, (response) => {
      if (typeof(response.data) != 'undefined') {
        var result = response.data;
        console.log(result);
        this.setState({store: result});
        this.setState({category_name: result.category.name});
        this.setState({owner: result.owner.username});
      }
    });
  }

  handleTabToggle = (event, tab) => {
    this.setState({ tab });
  };

  handleChange = (event, value) => {
    this.setState({ featured:value });
  };


  render() {
    const { classes } = this.props;
    const { tab, store } = this.state;
    const { gilad, jason, antoine } = this.state;
    const error = [gilad, jason, antoine].filter(v => v).length !== 2;
    return (
      <Wrapper>
        <Card className={classes.card}>
          <Grid container spacing={0} direction={'row'} alignItems={'stretch'}>
            <Grid item xs={12} sm={2} md={2}>
              <img alt={store.store_name} src={`${getHostAddress()}${store.store_image}`}  className={classes.imageHeader} />
            </Grid>
            <Grid item xs={12} sm={10} md={10} className="pa-1">
              <Typography variant="headline">{ store.store_name }</Typography>
              <Typography gutterBottom>
                { [1, 2, 3, 4, 5].map(star => (
                  <span className={star <= store.score ? null : classes.inactive} key={star}>&#9733;</span>
                ))}
              </Typography>
              <Typography variant="headline" className="mt-1" gutterBottom>
                <Grid container spacing={0} direction={'row'} alignItems={'stretch'}>
                  <Grid item md={2}>Store Category :</Grid><Grid item>{this.state.category_name}</Grid>
                </Grid>
                <Grid container spacing={0} direction={'row'} alignItems={'stretch'}>
                  <Grid item md={2}>Owner :</Grid><Grid item>{this.state.owner}</Grid>
                </Grid>

                <Grid container spacing={0} direction={'row'} alignItems={'stretch'}>
                  <Grid item md={2}>Featured Rate  {parseInt(this.state.featured)}%:</Grid>
                  <Grid item md={9}>
                    <Slider
                    classes={{ container: classes.slider }}
                    value={this.state.featured}
                    aria-labelledby="label"
                    onChange={this.handleChange}/>
                  </Grid>
                </Grid>
                
              </Typography>
              <div className="block my-1"></div>
              <div className={classes.tabContainer}>
                <Tabs
                  value={tab}
                  onChange={this.handleTabToggle}
                  classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                  scrollable
                  scrollButtons="auto"
                >
                  <Tab
                    disableRipple
                    classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                    label="Description"
                  />
                  <Tab
                    disableRipple
                    classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                    label="Customer Reviews"
                  />
                </Tabs>
                { tab === 0 &&
                  <CardContent>
                    <Typography gutterBottom>{store.description}</Typography>
                  </CardContent>
                }
                { tab === 1 &&
                  <CardContent>
                    <List>
                    </List>
                  </CardContent>
                }
              </div>
            </Grid>
          </Grid>
        </Card>
      </Wrapper>
    );
  }
}

StoreDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(EcommerceDetailStyles)(StoreDetail);