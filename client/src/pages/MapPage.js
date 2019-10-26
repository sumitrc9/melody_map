import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Redirect } from 'react-router-dom';

export class MapContainer extends Component {

  constructor(props) {
    super(props)
    this.state = defaultState
  }

  componentWillMount(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {

        this.setState({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
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

  render() {
    if (this.state.toSession === true) {
      return <Redirect to='/list' />
    }

    return (
      <Map initialCenter={{lat:33.7709925, lng:-84.4037136}} center={this.state.center} google={this.props.google} disableDefaultUI={true} zoom={14}>

        <Marker position={this.state.center}
                onClick={this.onMarkerClick.bind(this)}
                name={'Current location'} />
      </Map>
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
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDwgjrHsgCx_dhLEIyjFfilp62zLyM90vw')
})(MapContainer)