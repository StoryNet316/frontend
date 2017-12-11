import React, { Component } from 'react';
import * as firebase from 'firebase';
import database from './database/config';
import PropTypes from 'prop-types';
import Switch from 'material-ui/Switch';
import green from 'material-ui/colors/green';
import { FormControlLabel, FormGroup } from 'material-ui/Form';

import {Grid, TextField, Paper, Button } from 'material-ui';

import { withStyles } from 'material-ui/styles';

import * as Queries from './database/queries'

import GridList from './GridList'

var testImages = Queries.testImages;

// import { search , resultURL} from './BingImagesAPI'


class Home extends Component {
  constructor(props) {
      super(props);
      this.state = {
        isLoggedIn: props.isLoggedIn,
        story: "",
        currentUser: props.currentUser,
        showingStory: false,
        currentStory: "",
        currentSteps: [],
        currentUrls: [],
        privacyOn: false,
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.loadStory = this.loadStory.bind(this);
      this.handleChangePrivacy = this.handleChangePrivacy.bind(this);

      // this.getURL = this.getURL.bind(this);
      // this.updatePictures = this.updatePictures.bind(this);
  }

    handleChange(event) {
      if (event.target.value.length > 100) {
        this.setState({story: this.state.value.substring(0, 100)});
      }
      else {
        this.setState({story: event.target.value});
      }

    }

    handleChangePrivacy(){
        this.setState({
            privacyOn: !(this.state.privacyOn)
        })
    }

    handleSubmit(event) {
      event.preventDefault();
      var user = this.state.currentUser;

      if (!this.state.isLoggedIn) {
        alert("You must first log in or create an account before submitting a story!");
      }
      else {
        const d = new Date();

        Queries.getLatestSid().then((sidArray) => {
          var sid = sidArray[0] + 1;
          Queries.writeStoryData(user.uid, sid, d, this.state.story, this.state.privacyOn);
          console.log("Done writing story!")
          alert("User " + user.uid + " submitted story " + sid + " on " + d + "STORY: " + this.state.story);
          this.loadStory(sid);
        })


        this.setState({
          showingStory: true,
        })

        // return new Promise(function (resolve, reject) {
        //   resolve("s_test");
        // })

      }

    }

    loadStory(sid) {
      var ref = database.collection("users").doc(this.state.currentUser.uid.toString()).collection("myStories").doc(sid.toString());

      const thisComponent = this;

      ref.get().then(function(doc){
        if(doc && doc.exists){
          const string = doc.data().string;

          thisComponent.setState({
            currentStory: string,
            currentSteps: string.split(" "),
          })

        }
        else{
          return new Error("Oops");
        }

        //search(thisComponent.state.currentSteps[0]);


        // return new Promise(function (resolve, reject) {
        //   resolve(thisComponent.state.currentSteps[0])
        // })

      });



    }


    // getURL(event) {
    //   event.preventDefault();
    //   return this.handleSubmit().then(this.loadStory).then(search).then(function (url) {
    //     console.log(url)
    //   });
    // }
    //
    // updatePictures() {
    //   this.setState({
    //     currentUrls: resultURL,
    //   })
    // }



    render() {

      return (
        <div>
          <h2>Tell me a story!</h2>

          <Grid container>
            <Grid item xs={1} />

            <Grid item xs={10}>
              <form onSubmit={this.handleSubmit}>
                <TextField
                  placeholder="Enter your story here!"
                  helperText="(100 Character Limit)"
                  fullWidth
                  type="search"
                  autoFocus={true}
                  value={this.state.story}
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                />
              </form>
            </Grid>
            <Grid item xs={1}/>

            <Grid item xs={3}/>
            <Grid item xs={6}>
                <FormGroup>
                    <FormControlLabel
                    control={
                        <Switch
                        style={switchStyle}
                        checked={this.state.privacyOn}
                        onChange={this.handleChangePrivacy}
                        aria-label="checkedD"/>
                    }
                    label="Make your story private!"
                    />
                </FormGroup>
            </Grid>
            <Grid item xs={3}/>


          </Grid>

          {this.state.showingStory ?
            <div>
              <Grid container>
                <Grid item xs={1}/>
                <Grid item xs={10}>
                  <p>
                    <b>{this.state.currentStory}</b>

                    <GridList images={testImages}/>
                  </p>
                </Grid>
                <Grid item xs={1}/>
              </Grid>

            </div>
            : null}

        </div>
      );
    }

    /* Needed to update isLoggedIn on visit to empty path "....com/"*/
    componentDidMount() {

      const thisComponent = this;
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          thisComponent.setState({
            isLoggedIn: true,
            currentUser: user,
          });
        }
        else {
          // No user is signed in.
          thisComponent.setState({
            isLoggedIn: false,
            currentUser: null,
          });
        }

      });


    }
}

const switchStyle = {
    bar: {},
  checked: {
    color: green[500],
    '& + $bar': {
      backgroundColor: green[500],
    },
  },
};
export default Home;
