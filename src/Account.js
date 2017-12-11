import React, { Component } from 'react';
import * as firebase from "firebase";

import { Grid, TextField, Button, FormHelperText } from 'material-ui';

class Account extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: props.currentUser,
      username: props.currentUser.displayName,
    }

    this.handleSignout = this.handleSignout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateUsername = this.handleUpdateUsername.bind(this);
  }


  handleSignout = () => {
    firebase.auth().signOut().then(function() {
      //success
    }).catch(function(error) {
      // An error happened.
    });
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };



  handleUpdateUsername = () => {
    const thisComponent = this;
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: this.state.newUsername
    }).then(function() {
      // Update successful.
      console.log("update success!")
      thisComponent.setState({
        username: user.displayName,
      })

    }).catch(function(error) {
      // An error happened.
      console.log("update fail - " + error)
    });
  };


  render() {

    return (
      <div>

      { this.state.username == null ?
        <div>
          <h2>Please pick a username.</h2>
        </div>
        : <h2>Welcome {this.state.username}!</h2> }

        <Grid container>
          <Grid item xs={2} />
          <Grid item xs={8}>
            <form>
              <TextField
                label="New Username"
                fullWidth
                onChange={this.handleChange('newUsername')}
              />
              {/* TODO: Check for inappropriate names using web API or npm module */}
            </form>
          </Grid>
          <Grid item xs={2} />

          <Grid item xs={4} />
          <Grid item xs={4}>
            <Button onClick={this.handleUpdateUsername} raised color="accent" >Update Username</Button>
          </Grid>
          <Grid item xs={4} />

          <Grid item xs={4} />
          <Grid item xs={4}>
            <h3>Account Info:</h3>
            <p align="left">
              <b>Email:</b> {this.state.currentUser.email}
              <br/>
              <b>Photo URL:</b> {this.state.currentUser.photoURL ? this.state.currentUser.photoURL : "No photo uploaded"}
              <br/>
              <b>UID:</b> {this.state.currentUser.uid}
              <br/>
              <b>Email Verified:</b> {this.state.currentUser.emailVerified ? "Yes" : "No"}
            </p>
          </Grid>
          <Grid item xs={4} />


          <Grid item xs={4} />
          <Grid item xs={4}>
            <Button onClick={this.handleSignout} raised color="primary" >Sign Out</Button>
          </Grid>
          <Grid item xs={4} />
        </Grid>

      </div>
    )
  }


}

export default Account;