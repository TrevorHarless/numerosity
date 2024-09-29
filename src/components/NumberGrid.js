import React from 'react';
import HexButton from './HexButton';
import '../styles/NumberGrid.css';


const NumberGrid = ({ numbers, onSelect, selectedIndices }) => (
    <div className="number-grid">
      {numbers.map((num, index) => (
        <HexButton
          key={index}
          value={num}
          index={index} 
          onSelect={onSelect} 
          isSelected={selectedIndices.includes(index)}
        />
      ))}
    </div>
  );
  
  export default NumberGrid;
  
