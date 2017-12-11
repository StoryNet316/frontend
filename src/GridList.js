import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorderIcon from 'material-ui-icons/StarBorder';

import aubonpain from './resources/aubonpain.png'
import mcdonalds from './resources/mcdonalds.svg'
import pandaexpress from './resources/pandaexpress.png'
import redmango from './resources/redmango.png'
import theloop from './resources/theloop.png'

const placeholder = [
  {
    img: aubonpain,
    title: "Au Bon Pain",
    author: "1",
  },
  {
    img: mcdonalds,
    title: "McDonald's",
    author: "2",
  },
  {
    img: pandaexpress,
    title: "Panda Express",
    author: "3",
  },
  {
    img: redmango,
    title: "Red Mango",
    author: "4",
  },
  {
    img: theloop,
    title: "The Loop",
    author: "5",
  }]


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary[200],
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});

class SingleLineGridList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      images: props.images,
      tileData: [],
      isLoading: false,
    }
  }

  // Construct tile data here
  componentWillMount() {

    this.setState({
      isLoading: true,
    })

    var tileData = [];
    for(var i = 0; i < this.state.images.length; i++){
      var tile = {
        img: this.state.images[i],
        title: "",
      };
      tileData.push(tile);
    }


    this.setState({
      tileData: tileData,
      isLoading: false,
    })
  }

  render() {
    const { classes } = this.props;
    if(this.state.isLoading) {
      return (<div>Loading...</div>)
    }
    else{
      return (
        <div className={classes.root}>
          <GridList className={classes.gridList} cols={2.5}>
            {this.state.tileData.map(tile => (
              <GridListTile key={tile.img}>
                <img src={tile.img} alt={tile.title} />
                <GridListTileBar
                  title={tile.title}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                  actionIcon={
                    <IconButton>
                      <StarBorderIcon className={classes.title} />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      );
    }

  }

}

SingleLineGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleLineGridList);