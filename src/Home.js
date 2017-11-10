import React from 'react';
import { LinearProgress } from 'material-ui/Progress';

import TextField from 'material-ui/TextField';

import Grid from 'material-ui/Grid';

const Home = () => (
  <div>
    <LinearProgress mode="determinate" value="100" color="accent"/>
    <h1>Tell me a story!</h1>

    <Grid container>
      <Grid item md={1}/>
      <Grid item md={10}>
        <TextField
          id="search-bar"
          label=""
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Enter your story here!"
          helperText="(e.g. Today I got a job at McDonald's!)"
          fullWidth
        />
      </Grid>
    </Grid>

  </div>
)

export default Home;