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
        uidValue: '',
        uidStories: '-',
        name: '-'
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSearchUID = this.handleSearchUID.bind(this);

      this.handlePrivacyToggle = this.handlePrivacyToggle.bind(this);
  }

  handleSearchUID(event){
    event.preventDefault();
    console.log("searching for user " + this.state.uidValue);

    var ref = database.collection("users").doc(this.state.uidValue.toString()).collection("stories").doc("s1");
    var myData = "default data";

    const thisComponent = this;

    ref.get().then(function (doc) {
      if (doc && doc.exists) {
        myData = doc.data().string;
        console.log(myData)

        thisComponent.setState({
          uidStories: myData
        });


      }
    }).catch(function (error){
      console.log("could not fetch user stories: ", error)
    })


  }

  handleChange(event) {
    this.setState({uidValue: event.target.value});
  }

  handlePrivacyToggle(event) {
    alert('privacy toggled!');
    Queries.setPublic(1, "s1");
  }


  render(){
    return (
      <div>
        <h1 id="output">User Profile</h1>
        <p>
          User {this.state.uidValue}{"'s Profile:"}
          <li>Name: {this.state.name}</li>
          <li>Username: {this.state.username}</li>
          <li>Number of Stories: xxx</li>
          <li>One Story: {this.state.uidStories}</li>
          <form>
            <input type="textfield" onChange={this.handleChange} onSubmit={this.handleSearchUID}/>
            <Button onClick={this.handleSearchUID}> Search UID </Button>
          </form>

        </p>

        <Button id="privacyToggle" onClick={this.handlePrivacyToggle}> Set Public </Button>
      </div>
    )

  }
}

export default Search;