import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css'; // Import global styles
import GameContainer from './components/GameContainer'; // Import GameContainer as the main app component
import reportWebVitals from './reportWebVitals';

// Create root element and render GameContainer
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GameContainer />
  </React.StrictMode>
);

// Measure performance (optional)
reportWebVitals();
