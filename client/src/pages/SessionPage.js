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
          name: 'Song 1',
          artist: 'Artist',
        },
        {
          name: 'Song 2',
          artist: 'Artist',
        },
        {
          name: 'Song 3',
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
        <SongItem song={this.state.nextUp[0]}/>
        <SongItem song={this.state.nextUp[1]}/>
        <SongItem song={this.state.nextUp[2]}/>
        <h2>Current Section Characteristics</h2>
        <div className="characteristicRow">
          <div className="characteristic">{this.state.characteristics[0]}</div>
          <div className="characteristic">{this.state.characteristics[1]}</div>
        </div>
        <div className="characteristicRow">
          <div className="characteristic">{this.state.characteristics[2]}</div>
          <div className="characteristic">{this.state.characteristics[3]}</div>
        </div>
        <h2>Statistics</h2> 
        <div>{this.state.usersListening} users listening</div> 
      </div>
    );
  }
}
export default SessionPage;
