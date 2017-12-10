import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import Input, { InputLabel } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';

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

function Login(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="body1" className={classes.title}>
            Please Login
          </Typography>

          <FormControl className={classes.formControl}>
            <InputLabel
              FormControlClasses={{
              focused: classes.inputLabelFocused,
              }}
              htmlFor="custom-color-input"
            >
              Username
            </InputLabel>
            <Input
              classes={{
                inkbar: classes.inputInkbar,
              }}
              id="custom-color-input"
            />

            <InputLabel
              FormControlClasses={{
              focused: classes.inputLabelFocused,
              }}
              htmlFor="custom-color-input"
            >
              Password
            </InputLabel>
            <Input
              classes={{
                inkbar: classes.inputInkbar,
              }}
              id="custom-color-input"
            />


      </FormControl>

        </CardContent>
      </Card>
    </div>
  )

}

export default withStyles(styles)(Login);