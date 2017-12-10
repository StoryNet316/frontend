import React, { Component } from 'react';
import * as firebase from "firebase";

import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';

import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import { FormControl, FormHelperText } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';

import Grid from 'material-ui/Grid';


class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      showPassword: false,
      errorCode: "",
      errorMessage: "",
    };
  }


  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleRegister = () => {
    const thisComponent = this;

      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      thisComponent.setState({
        errorCode: errorCode,
        errorMessage: errorMessage,
      })
      });
  };

  handleLogin = event => {
    event.preventDefault()
    const thisComponent = this;

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      thisComponent.setState({
        errorCode: errorCode,
        errorMessage: errorMessage,
      })
    });
  };

  render(){

    return (
      <div>
        <h1>Please Login!</h1>

        <Grid container>

          <Grid item xs={2} />
          <Grid item xs={8}>
            <form onSubmit={this.handleLogin}>
              <TextField
                label="Email"
                fullWidth
                onChange={this.handleChange('email')}
                required
              />
              { this.state.errorMessage !== "" && this.state.errorCode.includes("email") ?
                                                      <FormHelperText error>{this.state.errorMessage}</FormHelperText> : null }
              { this.state.errorMessage !== "" && this.state.errorCode.includes("user") ?
                                                      <FormHelperText error>Invalid username or password.</FormHelperText> : null }
</form>
          </Grid>
          <Grid item xs={2} />

          <Grid item xs={2} />
          <Grid item xs={8}>
            <FormControl fullWidth>
              <InputLabel required onSubmit={this.handleLogin}>Password</InputLabel>
              <Input
                id="password"
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.password}
                onChange={this.handleChange('password')}
                onSubmit={this.handleLogin}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={this.handleClickShowPasssword}
                      onMouseDown={this.handleMouseDownPassword}
                    >
                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                on
              />
              { this.state.errorMessage !== "" && this.state.errorCode.includes("password") ?
                                                      <FormHelperText error>{this.state.errorMessage}</FormHelperText> : null }
              { this.state.errorMessage !== "" && this.state.errorCode.includes("too-many-requests") ?
                                                      <FormHelperText error>{this.state.errorMessage}</FormHelperText> : null }
</FormControl>
          </Grid>
          <Grid item xs={2} />

          <Grid item xs={4} />
          <Grid item xs={2}>
            <Button onClick={this.handleRegister} raised color="accent">Register</Button>
          </Grid>
          <Grid item xs={2}>
            <Button onClick={this.handleLogin} raised color="primary">Log In</Button>
          </Grid>

        </Grid>

      </div>
    )
  }


}

export default Login;