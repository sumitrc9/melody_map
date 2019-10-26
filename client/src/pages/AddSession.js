import React, { Component } from 'react';
import { TextField, Slider, Button } from '@material-ui/core';
import "./AddSession.css"

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
      change[property] = 
      this.setState(property)
    }
  }

  submitInfo() {
    console.log(JSON.stringify(this.state))
    fetch('http://localhost:8080/createSession/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: '',
        location: '',
        range: '',
        danceability: '0.0',
        energy: '0.0',
        positivity: '0.0',
        tempo: '90',
      })
    })
  }

  render() {
    return (
      <div>
        <h1 className="title">Create the Melody Session</h1>
        <div className="options container">
          <p className="option">Name</p>
          <TextField className="option-input" onChange={this.textChanged('name').bind(this)}/>
          <p className="option">Location</p>
          <TextField className="option-input" onChange={this.textChanged('location').bind(this)}/>
          <p className="option">Range</p>
          <TextField className="option-input" onChange={this.textChanged('range').bind(this)}/>
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
        <Button onClick={this.submitInfo.bind(this)}>Submit</Button>
      </div>
    );
  }
}
export default AddSession;
