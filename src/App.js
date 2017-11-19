import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import ButtonAppBar from './ButtonAppBar'
import Home from './Home'
import History from './History'
import { getStories } from './database/queries'

class App extends Component {

  render() {
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