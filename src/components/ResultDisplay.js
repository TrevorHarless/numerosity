import React from 'react';
import '../styles/ResultDisplay.css';

const ResultDisplay = ({ result }) => (
  <div className="result-display">
    Target: {result}
  </div>
);

export default ResultDisplay;
