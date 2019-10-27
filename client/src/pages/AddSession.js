import React, { Component } from 'react';
import { TextField, Slider, Button } from '@material-ui/core';
import "./AddSession.css";
class AddSession extends Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      location: '',
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

  submitInfo() {
    fetch('http://localhost:8080/createSession', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: '',
        location: '',
        range: 0,
        danceability: 0.0,
        energy: 0.0,
        positivity: 0.0,
        tempo: 90,
      })
    })
  }

  render() {
    return (
      <div>
        <div id="grad"></div>
        <h1 className="title">Create Melody Session</h1>
        <div className="options container">
          <p className="option">Name</p>
          {/* Text input is super hacky right now */}
          <TextField className="optionInput" onChange={this.textChanged('name').bind(this)}/>
          <p className="option">Location</p>
          <TextField className="optionInput" onChange={this.textChanged('location').bind(this)}/>
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
        <button type="button" className="button" onClick={this.submitInfo.bind(this)}>Submit</button>
      </div>
    );
  }
}

export default AddSession