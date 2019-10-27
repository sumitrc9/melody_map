import React, { Component } from 'react';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import LinearProgress from '@material-ui/core/LinearProgress';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Cookies from 'universal-cookie';
import  './SongPlayer.css';
import { Redirect } from 'react-router-dom';

class SongPlayer extends Component {

  constructor(props) {
    super(props);

    const cookies = new Cookies();
    const token = cookies.get('token');

    this.state = {
      token: token,
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
      queue: props.queue,
    };

    this.playerCheckInterval = null;
    this.checkForPlayer = this.checkForPlayer.bind(this)
    this.onStateChanged = this.onStateChanged.bind(this)
  }

  componentDidMount() {
    this.checkForPlayer();
  }

  checkForPlayer() {
    if (window.Spotify !== null && window.Spotify !== undefined) {
      console.log("connecting to spotify", window.Spotify)

      this.player = new window.Spotify.Player({
        name: 'Melody Maps',
        getOAuthToken: cb => { cb(this.state.token); }
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

        this.extendQueue()
        // .then( () => {
          // const song = this.state.queue.pop();
          // console.log("song: ", this.state.queue)
          // this.playSong(song, this.state.token, device_id)
        // })

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

  extendQueue() {
    return fetch('http://localhost:8080/getRec', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session: this.props.session,
      })
    }).then((res) => {
      res.json().then((body) => {
          const queue = this.state.queue
          const newQueue = queue.concat(body);
          this.setState({
            queue: newQueue,
          })
        })
      })
  }

  playSong(song, token, device_id) {
    console.log(song)
    const bearer = 'Bearer ' +  token
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
      method: 'PUT',
      headers: {
        'Authorization': bearer,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uris: [song.uri] }),
    })

    if (this.state.queue.length <= 5) {
      this.extendQueue()
    }
  }

  onStateChanged(state) {
    clearInterval(this.playerCheckInterval)
    // if we're no longer listening to music, we'll get a null state.
    if (state !== null) {
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
          const newPosition = this.state.position + 1000
          this.setState({
            position: newPosition,
          })
        }, 1000)
      }
    }
  }

  pausePlay() {
    if (this.state.duration === 0) {
      this.playSong(this.state.queue.shift(), this.state.token, this.state.deviceId);
    } else {
      this.player.togglePlay().then(() => {
        console.log("Pause Play")
      })
    }
  }

  skipSong() {
    this.playSong(this.state.queue.shift(), this.state.token, this.state.deviceId);
  }

  goBack() {
    this.setState({
      redirectBack: true,
    });
  }

  render() {

    if (this.state.redirectBack) {
      return <Redirect to='/map'/>
    }

    const progress = ((1.0) * this.state.position) / this.state.duration * 100;
    const displayName = this.state.trackName + " - " + this.state.artistName;

    var queue = [{
      name: "Song",
      artist: "Artist",
      image: "",
    },
    {
      name: "Song",
      artist: "Artist",
      image: "",
    },
    {
      name: "Song",
      artist: "Artist",
      image: "",
    },
    {
      name: "Song",
      artist: "Artist",
      image: "",
    },
    {
      name: "Song",
      artist: "Artist",
      image: "",
    }]
    if (this.state.queue.length >= 5) {
      queue = this.state.queue
    }
    return (
      <div>
        <div className="music-controls">
          <ArrowBackIosIcon style={{fill: 'white'}} onClick={this.goBack.bind(this)}/>
          <PlayCircleOutlineIcon style={{fill: 'white'}} onClick={this.pausePlay.bind(this)} src="/play.svg" className="play" />
          <div className="display">{displayName.substring(0, 70)}</div>
          <SkipNextIcon style={{fill: 'white'}} className="skip" onClick={this.skipSong.bind(this)}/>
        </div>
        <LinearProgress className="progress" variant="determinate" value={progress}/>
        <h2>Next Up</h2> 

        <div className="song-item-div">
          <img className="album-art" src={queue[0].image} style={{width: '50px',  height: '50px'}}/>
          <div className="info">
            <div className="song-name">{queue[0].name.substring(0,100)}</div>
            <div className="song-artist">{queue[0].artist}</div>
          </div>
        </div>

        <div className="song-item-div">
          <img className="album-art" src={queue[1].image} style={{width: '50px',  height: '50px'}}/>
          <div className="info">
            <div className="song-name">{queue[1].name.substring(0,100)}</div>
            <div className="song-artist">{queue[1].artist}</div>
          </div>
        </div>

        <div className="song-item-div">
          <img className="album-art" src={queue[2].image} style={{width: '50px',  height: '50px'}}/>
          <div className="info">
            <div className="song-name">{queue[2].name.substring(0,100)}</div>
            <div className="song-artist">{queue[2].artist}</div>
          </div>
        </div>

        <div className="song-item-div">
          <img className="album-art" src={queue[3].image} style={{width: '50px',  height: '50px'}}/>
          <div className="info">
            <div className="song-name">{queue[3].name.substring(0,100)}</div>
            <div className="song-artist">{queue[3].artist}</div>
          </div>
        </div>

        <div className="song-item-div">
          <img className="album-art" src={queue[4].image} style={{width: '50px',  height: '50px'}}/>
          <div className="info">
            <div className="song-name">{queue[4].name.substring(0,100)}</div>
            <div className="song-artist">{queue[4].artist}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default SongPlayer