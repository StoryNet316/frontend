import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import Grid from 'material-ui/Grid';

import * as Queries from './database/queries'
import database from './database/config';

class Search extends Component {

  constructor(props) {
      super(props);
      this.state = {
        currentUser: props.currentUser,
        uidValue: '',
        uidStories: [],
        numStories: 0,
        username: '-',
        urls: [],
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSearchUID = this.handleSearchUID.bind(this);
      this.handlePrivacyToggle = this.handlePrivacyToggle.bind(this);
  }

  handleSearchUID(event){
    event.preventDefault();
    // console.log("searching for user " + this.state.uidValue);
    //
    // var ref = database.collection("users").doc(this.state.uidValue.toString()).collection("stories").doc("s1");
    // var myData = "default data";
    //
    // const thisComponent = this;
    //
    // ref.get().then(function (doc) {
    //   if (doc && doc.exists) {
    //     myData = doc.data().string;
    //     console.log(myData)
    //
    //     thisComponent.setState({
    //       uidStories: myData
    //     });
    //
    //
    //   }
    // }).catch(function (error){
    //   console.log("could not fetch user stories: ", error)
    // })
    const thisComponent = this;
    Queries.getUserStories(this.state.uidValue)
                  .then(function (data){

                    thisComponent.setState({
                          uidStories: data,
                          numStories: data.length
                        });
                  })

    Queries.getUsername(this.state.uidValue)
                  .then(function (data){
                    thisComponent.setState({
                          username: data,
                        });
                  })

    Queries.getEntitiesInStory(this.state.uidValue, "s1")
                  .then(function(data){
                    thisComponent.setState({
                      urls: data,
                    })
                  })

    // Queries.getEntitiesInStory(1,"s1")
    //               .then(function(data){
    //                 thisComponent.setState({
    //                   urls: data,
    //                 })
    //               })

  }

  handleChange(event) {
    this.setState({uidValue: event.target.value});
  }

  handlePrivacyToggle(event) {
    alert('privacy toggled! for story s1');
    Queries.setPublic(1, "s1");
  }


  render(){
    const thisComponent = this;

    return (
      <div>
        <h2 id="output">Stor.io Search (Entities only works for story "s1") </h2>


        <Grid container>
          <Grid item xs={4}>
            <h5>
              User {this.state.uidValue}{"'s Profile:"}
              <li>Username: {this.state.username}</li>
              <li>Number of Stories: {this.state.numStories}</li>
              <li>All Stories:
                {this.state.uidStories.map(function(string){
                  return (
                    <ol>
                      {string}
                    </ol>
                  );
                })}
              </li>
              <li>All Entities:
                {this.state.urls.map(function(urls){
                  return (
                    <ol>
                      {urls}
                    </ol>
                  );
                })}
              </li>
            </h5>
          </Grid>

          <Grid item xs={7}>
            <form onSubmit={this.handleSearchUID}>
              <TextField
                placeholder="User ID"
                helperText="(Try an integer between 1 and 20)"
                fullWidth
                type="search"
                onChange={this.handleChange}
                onSubmit={this.handleSearchUID}
              />
              <Button onClick={this.handleSearchUID} raised color="primary"> Search UID </Button>
            </form>
          </Grid>

        </Grid>

        <Button id="privacyToggle" onClick={this.handlePrivacyToggle}> Set Public </Button>
      </div>
    )

  }
}

export default Search;