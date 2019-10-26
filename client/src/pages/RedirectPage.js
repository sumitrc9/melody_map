import React, { Component } from 'react';
import "./Home.css"
import hash from "./hash";
import { Redirect } from 'react-router-dom';

function Header(props) {

	  return (
	    <div className="home-header-contaner">
	      <h1 className="home-header-text"> Melody Maps </h1>
	    </div>
	  );
	}


class RedirectPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      redirect: false,
    }
  }
  componentDidMount() {

    fetch('http://localhost:8080/postToken', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: hash.access_token,
      })
    })
    this.setState({redirect: true}, () => {
      console.log(this.state)
    })
  }

	render() {
    if (this.state.redirect) {
      console.log("render state", this.state.redirect)
      return <Redirect to="/map" />
    }
    return (
      <div className="redirect-main-div">
          <Header/>
      </div>
    );
    }
	}
	export default RedirectPage;