import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import ButtonAppBar from './ButtonAppBar'
import History from './History'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ButtonAppBar/>
        <Router>
          <Route exact path="/history" component={History}/>
        </Router>
      </div>
    );
  }
}




export default App;