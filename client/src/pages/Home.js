import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import "./Home.css"
import hash from "./hash";


//Spotify OAuth
export const authEndpoint = "https://accounts.spotify.com/authorize";

// Replace with your app's client ID, redirect URI and desired scopes
export const clientId = "ce3c222b70fc46e2957d643195b432fb";
export const redirectUri = "http://localhost:3000/redirect";
export const scopes = [
    "user-top-read"
];


function Logo(props) {

  return (
    <div className="home-logo">
      <br/>
      <br/>
      <br/>
      <br/>
      <img src={process.env.PUBLIC_URL + "/mm_logo.jpg"}/>
    </div>
  );
}

/*
  This is the section of the screen that has the heading
*/
function Header(props) {

  return (
    <div className="home-header-contaner">
      <h1 className="home-header-text"> Melody Maps </h1>
    </div>
  );
}

/*
  Spotify Sign in button
*/
function SingIn(props) {

  return (
    <div className="home-sign-in">
      <h1 className="home-sign-in-button"></h1>
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
           </a>
    </div>
  );
}

class Home extends Component {
  
componentDidMount() {

  let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
  }
}

render() {
    return (
      <div className="home-main-div">
          <Logo/>
          <Header/>
          <SingIn/>
      </div>
    );
  }
}
export default Home;

/*

<h1>Project Home</h1>
      { Link to List.js }
      <Link to={'./list'}>
        <button variant="raised">
            My List
        </button>
      </Link>
*/