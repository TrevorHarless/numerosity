import React from "react";
import "../styles/Header.css";

const Header = ({ level, timer, operation }) => {
  // Map the operation symbol to the corresponding class name
  const operationClassName = {
    "+": "addition",
    "-": "subtraction",
    "*": "multiplication",
    "/": "division",
  }[operation];

  return (
    <div className="header">
      <div className="level-timer">
        <div>Level {level}</div>
        <div>Time Left: {timer}s</div>
      </div>
      <div className="operation-display">
        <div className="operation-label">OPERATION</div>
        <div className={`operation-icon operation-${operationClassName}`}>
          {operation === "+" && <span>+</span>}
          {operation === "-" && <span>-</span>}
          {operation === "*" && <span>×</span>}
          {operation === "/" && <span>÷</span>}
        </div>
      </div>
    </div>
  );
};

export default Header;
