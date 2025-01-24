import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import "./ArrayBarSlider.css";

interface ArrayBarSliderProps {
  arrayNumber: number;
  onChangeArrayBarSlider: (event: Event, value: number) => void;
}

const ArrayBarSlider: React.FC<ArrayBarSliderProps> = ({
  arrayNumber,
  onChangeArrayBarSlider,
}) => {
  const [value, setValue] = useState(arrayNumber);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
    onChangeArrayBarSlider(event, newValue as number);
  };

  return (
    <div className="range-slider-container">
      <p id="text-array-size">Array Size</p>
      <Slider
        id="arrayBarSlider"
        min={2}
        max={14} // Adjust the max value as needed
        step={1}
        value={value}
        valueLabelDisplay="auto"
        marks
        onChange={handleChange}
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

export default ArrayBarSlider;
