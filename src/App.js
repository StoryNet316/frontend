import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import * as firebase from "firebase";

import ButtonAppBar from './ButtonAppBar'
import Home from './Home'
import History from './History'
import Search from './Search';
import Login from './Login';
import Account from './Account';
import * as Queries from './database/queries.js'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      currentUser: null,
    }

    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.isLoggedIn();

    // Uncomment for re-initialization
    // Queries.initHistory();

  }



  isLoggedIn() {
    const thisComponent = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var name, email, photoUrl, uid, emailVerified;

        if (user != null) {
          name = user.displayName;
          email = user.email;
          photoUrl = user.photoURL;
          emailVerified = user.emailVerified;
          uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                           // this value to authenticate with your backend server, if
                           // you have one. Use User.getToken() instead.
        }
        console.log(name+" is logged in. email: "+email+", photoURL: "+photoUrl+", uid: "+uid+", emailVerified: "+emailVerified);

        // user.providerData.forEach(function (profile) {
        //   console.log("Sign-in provider: " + profile.providerId);
        //   console.log("  Provider-specific UID: " + profile.uid);
        //   console.log("  Name: " + profile.displayName);
        //   console.log("  Email: " + profile.email);
        //   console.log("  Photo URL: " + profile.photoURL);
        // });

        thisComponent.setState({
          isLoggedIn: true,
          currentUser: user,
        });

        return true;

      } else {
        // No user is signed in.
        console.log("no user logged in")
        thisComponent.setState({
          isLoggedIn: false,
          currentUser: null,
        });

        return false;
      }
    });
  }



  render() {

    return (
      <div className="App">
        <Router>
          <div>
            <ButtonAppBar isLoggedIn={this.state.isLoggedIn} />
            <Route exact path="/" render={() => <Redirect to="/login"/>} />
            <Route exact path="/home" render={() => <Home currentUser={this.state.currentUser} isLoggedIn={this.state.isLoggedIn} />} />
            {/*<Route exact path="/home"
              render={() => !this.state.isLoggedIn ? <Login/> : <Home/>}
            />*/}
            <Route exact path="/search" render={() => <Search currentUser={this.state.currentUser} />} />
            {/*<Route exact path="/search"
              render={() => !this.state.isLoggedIn ? <Login/> : <Search/>}
            />*/}
            <Route exact path="/history"
              render={() => !this.state.isLoggedIn ? <Login/> : <History currentUser={this.state.currentUser}/>}
            />
            <Route exact path="/login"
              render={() => !this.state.isLoggedIn ? <Login/> : <Home currentUser={this.state.currentUser} isLoggedIn={this.state.isLoggedIn} />}
            />
            <Route exact path="/account"
              render={() => !this.state.isLoggedIn ? <Home/> : <Account currentUser={this.state.currentUser} />}
            />


          </div>
        </Router>

      </div>
    );
  }
}



export default App;
