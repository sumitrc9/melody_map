import React, { Component } from 'react';
import SongPlayer from '../components/SongPlayer'
import SongItem from '../components/SongItem'
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
      nextUp: [
        {
          song: 'Song 1',
          artist: 'Artist',
        },
        {
          song: 'Song 2',
          artist: 'Artist',
        },
        {
          song: 'Song 3',
          artist: 'Artist',
        }
      ]
    }
  }

  render() {
    return (
      <div className="session-page-div">
        <SongPlayer/>
        <h2>Next Up</h2> 
        <SongItem/>
        <SongItem/>
        <SongItem/>
        <h2>Current Section Characteristics</h2>
        <div>Characteristic 1</div>
        <div>Characteristic 2</div>
        <div>Characteristic 3</div>
        <div>Characteristic 4</div>
        <h2>Statistics</h2> 
        <div>12 users listening</div> 
      </div>
    );
  }
}
export default SessionPage;
