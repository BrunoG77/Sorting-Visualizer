import React from "react";
import "./ArrayBar.css";

interface BarProps {
  value: number;
  index: number;
}

const Bar: React.FC<BarProps> = ({ value, index }) => {
  return (
    <div
      className="bar"
      key={index}
      style={{ transform: `rotateX(-20deg) rotateY(-30deg)` }}
    >
      <div className="side top"></div>
      <div className="side bottom"></div>
      <div className="side right">
        <div
          className="color-bar right-color-bar"
          style={{
            height: `${(value / 100) * 60}vh`,
            transform: `translateY(${60 - (value / 100) * 60}vh)`,
          }}
        ></div>
      </div>
      <div className="side left">
        <div
          className="color-bar left-color-bar"
          style={{
            height: `${(value / 100) * 60}vh`,
            transform: `translateY(${60 - (value / 100) * 60}vh)`,
          }}
        ></div>
      </div>
      <div className="side front">
        <div
          className="color-bar front-color-bar"
          style={{
            height: `${(value / 100) * 60}vh`,
            transform: `translateY(${60 - (value / 100) * 60}vh)`,
          }}
        ></div>
      </div>
      <div className="side back">
        <div
          className="color-bar back-color-bar"
          style={{
            height: `${(value / 100) * 60}vh`,
            transform: `translateY(${60 - (value / 100) * 60}vh)`,
          }}
        ></div>
      </div>
    </div>
  );
};

interface BarContainerProps {
  array: number[];
}

const BarContainer: React.FC<BarContainerProps> = ({ array }) => {
  return (
    <div className="bar-container">
      {array.map((value, i) => (
        <Bar key={i} value={value} index={i} />
      ))}
    </div>
  );
};

export default BarContainer;
