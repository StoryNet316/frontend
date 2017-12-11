import React from 'react';
import {withRouter} from "react-router-dom";
import database from './database/config';

import Tabs, { Tab } from 'material-ui/Tabs';
import HomeIcon from 'material-ui-icons/Home';
import HistoryIcon from 'material-ui-icons/History';
import AccountIcon from 'material-ui-icons/AccountCircle';
import SearchIcon from 'material-ui-icons/Search';

class IconLabelTabs extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        counter: 0,
      }

      this.handleChange = this.handleChange.bind(this);
  }


  handleChange = (event, value) => {
    this.props.history.push(value);
  };

  render() {
    const thisComponent = this;
    database.collection("stories").orderBy("sid", "desc").limit(1)
            .onSnapshot(function(querySnapshot) {
                var res = [];
                querySnapshot.forEach(function(doc) {
                    res.push(doc.data().sid);
                });

                var count = parseInt(res, 10);

                if(count != thisComponent.state.counter){
                  thisComponent.setState({
                    counter: parseInt(res, 10),
                  })
                }
            })

    return (
      <div>
        <Tabs
          value={this.props.history.location.pathname}
          onChange={this.handleChange}
          indicatorColor="white"
          textColor="contrast"
        >
          <Tab icon={<HomeIcon />} value="/home" label="Home" />
          <Tab icon={<SearchIcon />} value="/search" label="Search" />
          { this.props.isLoggedIn ? <Tab icon={<HistoryIcon />} value="/history" label="History" /> :
                                    null }
          { this.props.isLoggedIn ? <Tab icon={<AccountIcon />} value="/account" label="Account" /> :
                                    <Tab icon={<AccountIcon />} value="/login" label="Login" /> }

          <h4>{this.state.counter} Stor.ios created to date!</h4>
        </Tabs>
      </div>
    );
  }
}


export default withRouter(IconLabelTabs);