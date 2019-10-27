import React, { Component } from 'react';
import "./SongItem.css"

class SongItem extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="song-item-div">
        <div className="song-name">{this.props.song.name}</div>
        <div className="song-artist">{this.props.song.artist}</div>
      </div>
    )
  }
}

export default SongItem