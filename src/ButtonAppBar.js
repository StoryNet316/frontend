import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import IconLabelTabs from './IconLabelTabs';

import {withRouter} from 'react-router-dom';
import { withStyles } from 'material-ui/styles';


function ButtonAppBar(props) {


  return (
    <div>
      <AppBar position="static" classes={{
        root: props.classes.root, // className, e.g. `OverridesClasses-root-X`
        label: props.classes.label, // className, e.g. `OverridesClasses-label-X`
        }}>
        <Toolbar>
          <Typography type="title" color="inherit">
            STOR.IO
          </Typography>

          <IconLabelTabs/>

        </Toolbar>
      </AppBar>
    </div>
  );
}

const styles = {
  root: {
    background: 'linear-gradient(270deg, #32c8b4 40%, #5d87c6 60%)',
    color: 'white',
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
  },
  label: {
    textTransform: 'capitalize',
  },
};



export default withStyles(styles)(withRouter(ButtonAppBar));