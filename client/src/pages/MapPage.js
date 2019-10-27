import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Redirect } from 'react-router-dom';
import * as constants from '../constants';
import Cookies from 'universal-cookie';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import "./MapPage.css";

export class MapContainer extends Component {

  constructor(props) {
    super(props)
    this.state = defaultState
  }

  componentWillMount() {
    const cookies = new Cookies();
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition((position) => {

        this.setState({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });

        fetch('http://localhost:8080/updateLocation', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            location: this.state.center,
            id: cookies.get('id')
          })
        }).then(() => {
          fetch('http://localhost:8080/getSessions', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              location: this.state.center,
              id: cookies.get('id')
            })
          }).then((res) => {
            res.json().then((body) => {
              const { allSessions, joinedSession } = body
              console.log("all", allSessions)
              this.setState({
                markers: allSessions.map((obj) => {
                  return {
                    id: obj[0],
                    location: obj[1].location,
                    name: obj[1].name,
                  }
                })
              }, () => {
                console.log("markers", this.state.markers)
              });
            })
          }).catch((err) => {
            console.log("Error on getSessions: ", err)
          })
        }).catch((err) => {
          console.log("Error on updateLocation: ", err)
        })
      }, function() {
        console.log("Component current position could not be retrieved")
        // handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      console.log("Browser does not support Geolocation");
      // handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  createSession() {
    this.setState({
      toCreateSession: true,
    })
  }

  render() {
    if (this.state.toSession === true) {
      return <Redirect to='/session'/>
    }

    if (this.state.toCreateSession === true) {
      return <Redirect to={{
          pathname: '/addsession',
          state: { location: this.state.center }
        }}
      />
    }

    const markers = this.state.markers;

    console.log(markers)

    return (
      <div className="map-page">
        <Map initialCenter={{lat:33.7709925, lng:-84.4037136}} center={this.state.center} google={this.props.google} disableDefaultUI={true} zoom={14} styles={constants.mapStyles}>
          {markers.map(marker => <Marker key={marker.name} name={marker.name} position={marker.location} onClick={this.onMarkerClick.bind(this)}/>)}
        </Map>
        <div className="button-container">
          <Fab color="white" aria-label="add" className="add-session-button" onClick={this.createSession.bind(this)}>
            <AddIcon />
          </Fab>
        </div>
      </div>
    );
  }

  onMarkerClick() {
    this.setState(() => ({
      toSession: true
    }))
  }
}

const defaultState = {
  center: {
    lat: 33.7709925,
    lng: -84.4037136
  },
  markers: [],
}


export default GoogleApiWrapper({
  apiKey: ('AIzaSyDwgjrHsgCx_dhLEIyjFfilp62zLyM90vw')
})(MapContainer)