import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import Tabs, { Tab } from 'material-ui/Tabs';
import PhoneIcon from 'material-ui-icons/Phone';
import FavoriteIcon from 'material-ui-icons/Favorite';
import PersonPinIcon from 'material-ui-icons/PersonPin';


function ButtonAppBar(props) {

  return (
    <div>
      <AppBar position = "static">
        <Toolbar>
          <Typography type = "title" color = "inherit">
            STOR.IO
          </Typography>

          <IconLabelTabs/>

          <Button color = "contrast">Login</Button>

        </Toolbar>
      </AppBar>
    </div>
  );
}

class IconLabelTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div>
        <Tabs
          value = {this.state.value}
          onChange = {this.handleChange}
          fullWidth
          indicatorColor = "white"
          textColor = "contrast"
        >
          <Tab icon = {<PhoneIcon />} label="Home" />
          <Tab icon = {<FavoriteIcon />} label="History" />
          <Tab icon = {<PersonPinIcon />} label="Settings" />
        </Tabs>
      </div>
    );
  }
}



export default ButtonAppBar;