import React, { Component } from 'react';
import "./SongItem.css"

class SongItem extends Component {
  render() {
    var song = "Song"
    var artist = "Artist"
    console.log(this.props.song)
    if (this.props.song) {
      song = this.props.song.name
      artist = this.props.song.artist
    }
    return (
      <div className="song-item-div">
        <img className="album-art"/>
        <div className="info">
          <div className="song-name">{song}</div>
          <div className="song-artist">{artist}</div>
        </div>
      </div>
    )
  }
}

export default SongItem