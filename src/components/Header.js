import React from "react";
import "../styles/Header.css"; // Make sure to add styling here

const Header = ({ level, timer, operation }) => (
  <div className="header">
    <div className="level-timer">
      <div>Level {level}</div>
      <div>Time Left: {timer}s</div>
    </div>
    <div className="operation-display">
      <div className="operation-label">OPERATION</div>
      <div className={`operation-icon operation-${operation}`}>
        {operation === "+" && <span>+</span>}
        {operation === "-" && <span>-</span>}
        {operation === "*" && <span>×</span>}
        {operation === "/" && <span>÷</span>}
      </div>
    </div>
  </div>
);

export default Header;
