import React, { Component } from 'react';
import SongPlayer from '../components/SongPlayer'
import "./SessionPage.css"

class SessionPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      characteristics: ['1', '2', '3', '4'],
      usersListening: 0,
      currentSong: {
        song: 'Song name',
        artist: 'Artist name',
      },
      queue: [],
    }
  }

  render() {
    const sessionID = this.props.location.state.session
    console.log("session", sessionID)
    return (
      <div className="session-page-div">
        <SongPlayer className="song-player" session={sessionID}  queue={this.state.queue}/>
      </div>
    );
  }
}
export default SessionPage;
