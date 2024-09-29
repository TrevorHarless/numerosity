import React from 'react';
import HexButton from './HexButton';
import '../styles/NumberGrid.css';


const NumberGrid = ({ numbers, onSelect, selectedIndices }) => (
    <div className="number-grid">
      {numbers.map((num, index) => (
        <HexButton
          key={index}
          value={num}
          index={index} // Pass index
          onSelect={onSelect} // Pass both num and index to onSelect
          isSelected={selectedIndices.includes(index)} // Check if index is in selectedIndices
        />
      ))}
    </div>
  );
  
  export default NumberGrid;
  
