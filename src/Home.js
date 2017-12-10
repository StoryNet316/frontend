import React, { Component } from 'react';
import * as firebase from 'firebase';
import database from './database/config';

import {Grid, TextField, Paper, Button } from 'material-ui';

import { withStyles } from 'material-ui/styles';

import * as Queries from './database/queries'

import { search , resultURL} from './BingImagesAPI'


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
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.loadStory = this.loadStory.bind(this);
      // this.getURL = this.getURL.bind(this);
      this.updatePictures = this.updatePictures.bind(this);
  }

    handleChange(event) {
      if (event.target.value.length > 100) {
        this.setState({story: this.state.value.substring(0, 100)});
      }
      else {
        this.setState({story: event.target.value});
      }

    }

    handleSubmit(event) {
      event.preventDefault();
      var user = this.state.currentUser;

      if (!this.state.isLoggedIn) {
        alert("You must first log in or create an account before submitting a story!");
      }
      else {
        const d = new Date();

        Queries.writeUserData(user.uid,user.displayName, Queries.getNumStories(user.uid) + 1);
        Queries.writeStoryData(user.uid, "s_test", new Date(), this.state.story, 0, false);
        console.log("Done writing story!")

        alert("User " + user.uid + " submitted story " + "s_test" + " on " + d + "STORY: " + this.state.story);

        this.loadStory("s_test")


        this.setState({
          showingStory: true,
        })

        // return new Promise(function (resolve, reject) {
        //   resolve("s_test");
        // })

      }

    }

    loadStory(sid) {
      var ref = database.collection("users").doc(this.state.currentUser.uid).collection("stories").doc(sid);

      const thisComponent = this;

      ref.get().then(function(doc){
        const string = doc.data().string;

        thisComponent.setState({
          currentStory: string,
          currentSteps: string.split(" "),
        })

        search(thisComponent.state.currentSteps[0]);

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

    updatePictures() {
      this.setState({
        currentUrls: resultURL,
      })
    }



    render() {

      return (
        <div>
          <h2>Tell me a story! (Only creates story "s_test")</h2>

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

          </Grid>

          {this.state.showingStory ?
            <div>
              <Grid container>
                <Grid item xs={2} />
                <Grid item xs={8}>
                  <p>
                    <b>{this.state.currentStory}</b>
                    <li>Steps:
                      {this.state.currentSteps.map(function(step){
                        return (
                          <ol>
                            {step}
                          </ol>

                        );
                      })}
                    </li>
                    <img src={this.state.currentUrls} alt="result url"/>
                  </p>
                </Grid>
                <Grid item xs={2}/>
              </Grid>
            </div>
            : null}

            <Button onClick={this.updatePictures} raised color="default"> Update Pictures </Button>

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


export default Home;