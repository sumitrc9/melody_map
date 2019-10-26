import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import "./Home.css"


function Logo(props) {

  return (
    <div className="home-logo">
      <img src={process.env.PUBLIC_URL + "/mm_logo.png"}/>
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
      <h1 className="home-sign-in-button">Log in</h1>
    </div>
  );
}

class Home extends Component {
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