import React, { Component } from 'react';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import LinearProgress from '@material-ui/core/LinearProgress';
import Cookies from 'universal-cookie';
import  './SongPlayer.css';

class SongPlayer extends Component {

  componentDidMount() {
    console.log("Component mounted")
    this.checkForPlayer();
  }

  checkForPlayer() {
    if (window.Spotify !== null && window.Spotify !== undefined) {
      console.log("connecting to spotify", window.Spotify)

      const cookies = new Cookies();
      const token = cookies.get('token');
      const player = new window.Spotify.Player({
        name: 'Melody Maps',
        getOAuthToken: cb => { cb(token); }
      });
    
      // Error handling
      player.addListener('initialization_error', ({ message }) => { console.error(message); });
      player.addListener('authentication_error', ({ message }) => { console.error(message); });
      player.addListener('account_error', ({ message }) => { console.error(message); });
      player.addListener('playback_error', ({ message }) => { console.error(message); });
    
      // Playback status updates
      player.addListener('player_state_changed', state => { console.log(state); });
    
      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });
    
      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });
    
      // Connect to the player!
      player.connect();
    } else {
      console.log("Spotify web player not available on component load")
      window.spotifyCallback = this.checkForPlayer;
    }
  }

  render() {
    return (
      <div>
        <div className="music-controls">
          <PlayCircleOutlineIcon/>
          <div>{this.props.currentSong}</div>
          <SkipNextIcon/>
        </div>
        <LinearProgress variant="determinate" value={.9}/>
      </div>
    )
  }
}

export default SongPlayer