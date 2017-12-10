import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';


const styles = theme => ({
  root: {
    marginLeft: '10%',
    marginRight: '10%',
    background: theme.palette.background.contentFrame,
    padding: '5px',
  },
});

function HistoryList(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>

      <List>
        <ListItem button>
          <ListItemText primary="Story 1" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Story 2" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Story 3" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Story 4" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Story 5" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Story 6" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Story 7" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Story 8" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Story 9" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Story 10" />
        </ListItem>

        <Divider/>

        <ListItem button>
          <ListItemText primary="Story 1" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Story 2" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Story 3" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Story 4" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Story 5" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Story 6" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Story 7" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Story 8" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Story 9" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Story 10" />
        </ListItem>
      </List>

    </div>
  );
}

HistoryList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HistoryList);