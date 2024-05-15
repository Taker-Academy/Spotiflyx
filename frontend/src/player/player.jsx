import React from 'react';
import './player.css';

function Player() {
  return (
    <div className="player-wrapper">
      <div className='cover'></div>
      <div className='title'>
        <span className='song'>J'suis qu'un Thug</span>
        <span>Lacrim</span>
      </div>
    </div>
  );
}

export default Player;