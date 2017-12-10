import React, { Component } from 'react';
import { AppBar,Toolbar, Grid } from 'material-ui';

import IconLabelTabs from './IconLabelTabs';

import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';


class ButtonAppBar extends Component {


  render() {

    return (
      <div>
        <AppBar position="static" classes={{
          root: this.props.classes.root
          }}
          >
          <Toolbar>
            <img src={require("./resources/StorioLogo.png")} alt="STOR.IO" height="50" width="125"/>

            <IconLabelTabs isLoggedIn={this.props.isLoggedIn}/>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

}

var r = Math.floor(Math.random() * 20);
/* Color codes taken from https://www.materialui.co/flatuicolors */
const bgColors = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e',
                  '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50',
                  '#f1c40f', '#e67e22', '#e74c3c', '#ecf0f1', '#95a5a6',
                  '#f39c12', '#d35400', '#c0392b', '#bdc3c7', '#7f8c8d'];
const fontColors = ['#f39c12', '#d35400', '#c0392b', '#bdc3c7', '#7f8c8d',
                    '#f1c40f', '#e67e22', '#e74c3c', '#ecf0f1', '#95a5a6',
                    '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50',
                    '#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e'];

const styles = {
  root: {
    background: bgColors[r],
    color: fontColors[r],
    padding: '0px 0px'
  }
};



export default withStyles(styles)(withRouter(ButtonAppBar));