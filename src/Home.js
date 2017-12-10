import React, { Component } from 'react';
import { LinearProgress } from 'material-ui/Progress';

import TextField from 'material-ui/TextField';

import Grid from 'material-ui/Grid';



class Home extends Component {
  constructor(props) {
      super(props);
      this.state = {value: ''};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleSubmit(event) {
      alert('A story was submitted: ' + this.state.value);
      event.preventDefault();
    }

    render() {
      return (
        <div>
          <LinearProgress mode="determinate" value={100} color="accent"/>
          <h1>Tell me a story!</h1>


          <Grid container>
            <Grid item md={1}/>

            <Grid item md={10}>
              <form onSubmit={this.handleSubmit}>
                <TextField
                  id="search-bar"
                  label=""
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="Enter your story here!"
                  helperText="(e.g. Today I got a job at McDonald's!)"
                  fullWidth

                  onChange={this.handleChange}

                  onSubmit={this.handleSubmit}
                />
                <input type="submit" value="Go" />
              </form>
            </Grid>

          </Grid>


        </div>
      );
    }
}


export default Home;