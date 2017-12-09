import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import ButtonAppBar from './ButtonAppBar'
import Home from './Home'
import History from './History'
import * as Query from './database/queries'


class App extends Component {

  render() {
    //Query.initApp();

    console.log(Query.getStories(1));
    console.log(Query.getStoryEntities("s1"));
    console.log(Query.getStoryNumber(1));
    console.log(Query.topUsers(3));




    return (
      <div className="App">
        <Router>
          <div>
            <ButtonAppBar/>
            <Route exact path="/" component={Home}/>
            <Route exact path="/history" component={History}/>

          </div>
        </Router>

      </div>
    );
  }
}




export default App;
