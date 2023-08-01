import React from 'react';
import "./VolumeSlider.css";

const VolumeSlider = ({ volume, onVolumeChange }) => {
  return (
    <input
      type="range"
      min="0"
      max="100"
      value={volume}
      onChange={(e) => onVolumeChange(e.target.value)}
    />
  );
};

export default VolumeSlider;
