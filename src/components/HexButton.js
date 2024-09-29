import React from 'react';
import '../styles/HexButton.css';

const HexButton = ({ value, index, onSelect, isSelected }) => (
  <button
    className={`hex-button ${isSelected ? 'selected' : ''}`}
    onClick={() => onSelect(value, index)} // Pass index to onSelect
  >
    {value}
  </button>
);

export default HexButton;

