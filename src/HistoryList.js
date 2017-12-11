import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import Divider from 'material-ui/Divider';
import StarBorder from 'material-ui-icons/StarBorder';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import {Grid, TextField, Paper, Button } from 'material-ui';

import GridList from './GridList';
import HistoryItem from './HistoryItem'

import * as Queries from './database/queries'


class HistoryList extends Component{

  constructor(props) {
    super(props);

    this.state = {
      currentUser: props.currentUser,
      // openedItem: -1,
      recentStories: [],
      isLoading: false,

    }




  }

  componentWillMount(){
    this.setState({
      isLoading: true,
    })

    const thisComponent = this;
    Queries.getRecentStories(this.state.currentUser.uid, 10).then(function (res){
      for(var i = 0; i < res.length; i++) {
        thisComponent.state.recentStories.push(res[i]);
      }

      thisComponent.setState({
        isLoading: false,
      })

    })
  }

  handleClick() {
    // Get sorted image array
    
  }

  render() {
    if(this.state.isLoading){
      return(<div/>)//loading thing
    }
    else{
      return (
        <div>
          <Grid container>
            <Grid item xs={1} />
            <Grid item xs={10}>
              <List classes={{root: this.props.classes.root}}>
              {this.state.recentStories.map(function(story) {
                return (
                  <div>
                    <HistoryItem name={story}/>
                    <Divider style={dividerStyle}/>
                  </div>
                )
              })}

              </List>
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </div>
      );
    }

  }

}

const dividerStyle = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  color: 'white',
  height: 3,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
};

const styles = {
  root: {
    background: "black",
    color: "white",
    padding: '0px 0px'
  }
};
export default withStyles(styles)(HistoryList);