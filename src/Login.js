import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';

import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';

import Grid from 'material-ui/Grid';

const styles = theme => ({
  card: {
    minWidth: 275,
    maxWidth: 500,
    alignContent: 'center'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
});

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      password: '',
      showPassword: false
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


  render(){

    return (
      <div>
        <h1>Please Login!</h1>

        <Grid>
          <Grid>
            <FormControl>
              <InputLabel>
                Username
              </InputLabel>
              <Input
                type="text"
              />
            </FormControl>
          </Grid>
          <Grid>
            <FormControl>
            <InputLabel>Password</InputLabel>
            <Input
              id="password"
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.password}
              onChange={this.handleChange('password')}
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
            />
            </FormControl>
          </Grid>
        </Grid>

      </div>
    )
  }


}

export default withStyles(styles)(Login);