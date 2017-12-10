import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import GridList from './GridList';


class HistoryList extends Component{

  constructor(props) {
    super(props);

    this.state = {
      // Denotes the list item that is currently open
      openedItem: -1,
    }
  }


  render() {
    return (
      <div>

        <List>
          <ListItem button>
            <ListItemText primary="Story 1" />
            <GridList/>
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
    )
  }

}


export default HistoryList;