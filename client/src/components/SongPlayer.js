import React, { Component } from 'react';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import LinearProgress from '@material-ui/core/LinearProgress';
import Cookies from 'universal-cookie';
import  './SongPlayer.css';

class SongPlayer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // token: "",
      // deviceId: "",
      // loggedIn: false,
      // error: "",
      trackName: "Track Name",
      artistName: "Artist Name",
      albumName: "Album Name",
      playing: false,
      position: 0,
      duration: 0,
      deviceId: '',
    };

    this.playerCheckInterval = null;
    this.checkForPlayer = this.checkForPlayer.bind(this)
    this.onStateChanged = this.onStateChanged.bind(this)
  }

  componentDidMount() {
    this.checkForPlayer();
  }

  // createEventHandlers() {
  //   this.player.on('initialization_error', e => { console.error(e); });
  //   this.player.on('authentication_error', e => {
  //     console.error(e);
  //     this.setState({ loggedIn: false });
  //   });
  //   this.player.on('account_error', e => { console.error(e); });
  //   this.player.on('playback_error', e => { console.error(e); });
  
  //   // Playback status updates
  //   this.player.on('player_state_changed', state => { console.log(state); });
  
  //   // Ready
  //   this.player.on('ready', data => {
  //     let { device_id } = data;
  //     console.log("Let the music play on!");
  //     this.setState({ deviceId: device_id });
  //   });
  // }

  checkForPlayer() {
    if (window.Spotify !== null && window.Spotify !== undefined) {
      console.log("connecting to spotify", window.Spotify)

      const cookies = new Cookies();
      const token = cookies.get('token');
      this.player = new window.Spotify.Player({
        name: 'Melody Maps',
        getOAuthToken: cb => { cb(token); }
      });
    
      // Error handling
      this.player.addListener('initialization_error', ({ message }) => { console.error(message); });
      this.player.addListener('authentication_error', ({ message }) => { console.error(message); });
      this.player.addListener('account_error', ({ message }) => { console.error(message); });
      this.player.addListener('playback_error', ({ message }) => { console.error(message); });
    
      // Playback status updates
      this.player.addListener('player_state_changed', state => {
        this.onStateChanged(state);
      });
    
      // Ready
      this.player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        this.setState({
          deviceId: device_id,
        })

        // 
        const bearer = 'Bearer ' +  token
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
          method: 'PUT',
          headers: {
            'Authorization': bearer,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uris: ['spotify:track:6hLkeOMrhZ2CMLBp2of576'] }),
        })
      });
    
      // Not Ready
      this.player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });
    
      // Connect to the player!
      this.player.connect();
      
    } else {
      console.log("Spotify web player not available on component load")
      window.spotifyCallback = this.checkForPlayer;
    }
  }

  onStateChanged(state) {
    clearInterval(this.playerCheckInterval)
    // if we're no longer listening to music, we'll get a null state.
    if (state !== null) {
      console.log("state", state); 
      const {
        current_track: currentTrack,
      } = state.track_window;

      const position = state.position
      const duration = state.duration
      const trackName = currentTrack.name;
      const albumName = currentTrack.album.name;
      const artistName = currentTrack.artists
        .map(artist => artist.name)
        .join(", ");
      const playing = !state.paused;
      this.setState({
        position,
        duration,
        trackName,
        albumName,
        artistName,
        playing
      });

      if (playing) {
        this.playerCheckInterval = window.setInterval(() => {
          console.log(this.state.position);
          const newPosition = this.state.position + 1000
          this.setState({
            position: newPosition,
          })
        }, 1000)
      }
    }
  }

  pausePlay() {
    this.player.togglePlay().then(() => {
      console.log("Pause Play")
    })
  }

  skipSong() {
    this.player.nextTrack().then(() => {
      console.log("Skip")
    })
  }

  render() {
    const progress = ((1.0) * this.state.position) / this.state.duration * 100;
    const displayName = this.state.trackName + " - " + this.state.artistName;
    return (
      <div>
        <div className="music-controls">
          <PlayCircleOutlineIcon onClick={this.pausePlay.bind(this)}/>
          <div>{displayName}</div>
          <SkipNextIcon onClick={this.skipSong.bind(this)}/>
        </div>
        <LinearProgress variant="determinate" value={progress}/>
      </div>
    )
  }
}

export default SongPlayer