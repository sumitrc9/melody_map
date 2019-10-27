import React, { Component } from 'react';
import { TextField, Slider, Button } from '@material-ui/core';
import "./AddSession.css";
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
class AddSession extends Component {

  constructor(props) {
    super(props)

    var location = {
      lat: 0.0,
      lng: 0.0
    }

    if (props.location.state) {
      location = props.location.state.location
    }

    this.state = {
      name: '',
      location: location,
      range: '',
      danceability: '0.0',
      energy: '0.0',
      positivity: '0.0',
      tempo: '90',
    }
  }

  textChanged(property) {
    return (event) => {
      var change = {}
      change[property] = event.target.value;
      this.setState(change)
    }
  }

  locationChanged(property) {
    return (event) => {
      var change = this.state.location
      change[property] = event.target.value;
      this.setState({
        location: change
      }, () => {
        console.log(this.state)
      })
    }
  }

  async submitInfo() {
    const cookies = new Cookies();

    console.log("submi")

    const stateCopy = {...this.state};
    delete stateCopy["redirect"]
    fetch('http://localhost:8080/createSession', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...stateCopy, id: cookies.get('id')})
    }).then((res) => {
      res.json().then((body) => {
        console.log("bodie", body)
        this.setState({
          session: body,
          redirect: true,
        });
      })
    }).catch(() => {
      console.log("Sad")
    })
  }

  render() {
    if (this.state.redirect) {
      console.log("beep", this.state.session)
      return <Redirect to={{
        pathname: '/session',
        state: { session: this.state.session },
      }}/>;
    }

    return (
      <div className="add-session-container">
        <h1 className="title">Create Melody Session</h1>
        <div className="options container">
          <p className="option">Name</p>
          {/* Text input is super hacky right now */}
          <TextField className="optionInput" onChange={this.textChanged('name').bind(this)}/>
          <p className="option">Location</p>
          <TextField className="optionInput" onChange={this.locationChanged('lat').bind(this)} value={this.state.location.lat}/>
          <TextField className="optionInput" onChange={this.locationChanged('lng').bind(this)} value={this.state.location.lng}/>
          <p className="option">Range</p>
          <TextField className="optionInput" onChange={this.textChanged('range').bind(this)}/>
        </div>
        <div className="qualities container">
          <p>Danceability</p> 
          <Slider/>
          <p>Energy</p>
          <Slider/>
          <p>Positivity</p>
          <Slider/>
          <p>Tempo</p>
          <Slider/>
        </div>
        <button 
          type="button" 
          className="button" 
          onClick={this.submitInfo.bind(this)}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default AddSession