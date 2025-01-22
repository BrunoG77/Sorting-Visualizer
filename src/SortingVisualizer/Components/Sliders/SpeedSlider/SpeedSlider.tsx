import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import "./SpeedSlider.css";

interface ArrayBarSliderProps {
  animationSpeed: number;
  onChangeAnimationSpeedSlider: (value: number) => void;
}

const SpeedSlider: React.FC<ArrayBarSliderProps> = ({
  animationSpeed,
  onChangeAnimationSpeedSlider,
}) => {
  const [displayValue, setDisplayValue] = useState(animationSpeed);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    // Update the display value for visual feedback
    setDisplayValue(newValue as number);
  };

  const handleChangeCommitted = (
    _event: React.SyntheticEvent | Event,
    newValue: number | number[]
  ) => {
    onChangeAnimationSpeedSlider(newValue as number);
  };

  return (
    <div className="range-slider-container">
      <p id="text-animation-speed">Animation Speed (ms)</p>
      <Slider
        id="animationSpeedSlider"
        min={5}
        max={250} // Adjust the max value as needed
        value={displayValue}
        valueLabelDisplay="auto"
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        sx={{
          color: "rgb(56, 212, 255)",
          width: "60%",
          padding: "10px",
          "& .MuiSlider-thumb": {
            height: 15,
            width: 15,
            backgroundColor: "rgb(56, 212, 255)",
            marginTop: 0,
            marginLeft: 0,
            borderRadius: "10px",
          },
          "& .MuiSlider-track": {
            height: 5,
            borderRadius: 4,
          },
          "& .MuiSlider-rail": {
            height: 5,
            borderRadius: 4,
          },
        }}
      />
    </div>
  );
};

export default SpeedSlider;
