import React from 'react';

import { LoggedIn, NotLoggedIn } from './Login'


export function Check(props) {
  // const isLoggedIn = props.isLoggedIn;
  const isLoggedIn = false;
  console.log("Login State: ", isLoggedIn)

  if (isLoggedIn) {
    console.log("returning main page")
    return <LoggedIn/>;
  }
  else {
    console.log("returning login page")
    return (
      <NotLoggedIn/>
    );
  }

}