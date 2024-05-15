import React, { useState } from "react";
import './musicCard.css';
import { IoPlayCircle } from "react-icons/io5";
import ImageSrc from './a7.jpg';

export default function MusicCard({ title, subtitle }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div 
      className="music-card" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={ImageSrc} alt="Music" className="music-image" />
      <div className="overlay">
        <h2 className="title">A7</h2>
        <p className="subtitle">SCH</p>
        {isHovered && <IoPlayCircle className="play-icon" />}
      </div>
    </div>
  );
}

