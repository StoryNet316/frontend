import React from 'react';
import {withRouter} from "react-router-dom";

import Tabs, { Tab } from 'material-ui/Tabs';
import HomeIcon from 'material-ui-icons/Home';
import HistoryIcon from 'material-ui-icons/History';
// import SettingsIcon from 'material-ui-icons/Settings';

class IconLabelTabs extends React.Component {
  state = {
    tabNumber: 0,
  };

  handleChange = (event, value) => {

    this.props.history.push(value)
  };

  render() {
    console.log("debug")
    console.log(this.props)
    return (
      <div>
        <Tabs
          value={this.props.history.location.pathname}
          onChange={this.handleChange}
          fullWidth
          indicatorColor="white"
          textColor="contrast"
        >
          <Tab icon={<HomeIcon />} value="/" label="Home" />
          <Tab icon={<HistoryIcon />} value="/history" label="History" />
        </Tabs>
      </div>
    );
  }
}

export default withRouter(IconLabelTabs);