import React, { Component } from 'react';
import "./Home.css"
import hash from "./hash";


function Header(props) {

	  return (
	    <div className="home-header-contaner">
	      <h1 className="home-header-text"> Melody Maps </h1>
	    </div>
	  );
	}


class Redirect extends Component {

componentDidMount() {
  
let _token = hash.access_token;
console.log(hash.access_token);

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
}

	render() {
	    return (
	      <div className="redirect-main-div">
	          <Header/>
	          <Redirect to='/MapPage' />
	      
	      </div>
	    );
	  }
	}
	export default Redirect;
