import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import IconLabelTabs from './IconLabelTabs';

import {withRouter} from "react-router-dom";

function ButtonAppBar(props) {

  const rightButtons = (
    <div>
      <Button color="contrast">Login</Button>
    </div>
  );

  return (
    <div>
      <AppBar position="static" iconRightElement={rightButtons}>
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





export default withRouter(ButtonAppBar);