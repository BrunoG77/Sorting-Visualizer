/* useState is used to manage state in functional components, 
useEffect is used to handle side effects, such as fetching data or setting up event listeners.*/
import { useState, useEffect } from "react";

/* Array bar*/
import ArrayBar from "./Components/ArrayBar/ArrayBar";

/* Buttons Bar */
import ButtonsBar from "./Components/ButtonsBar/ButtonsBar";

/* Sliders */
import Slider from "./Components/Sliders/Sliders";

/* Style*/
import "./SortingVisualizer.css";

// Functions to test
export const SortingVisualizerFunctions = () => {
  const [array, setArray] = useState<number[]>([]);
  const [arrayNumber, setNumberOfArrayBars] = useState(10);

  const handleArrayBarSliderChange = (event: Event, value: number) => {
    setNumberOfArrayBars(value as number);
    console.log(`Array Number ${value}| Event: ${event}`);
  };

  const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const resetArray = (newArrayNumber: number) => {
    const newArray = [];
    console.log(`Array Number to make array ${newArrayNumber}`);
    for (let i = 0; i < newArrayNumber; i++) {
      newArray.push(randomIntFromInterval(10, 100));
    }
    setArray(newArray);
  };

  /*This line uses the useEffect hook to run the resetArray function once when the component mounts.*/
  useEffect(() => {
    resetArray(arrayNumber);
  }, [arrayNumber]);

  const bubbleSort = () => {};
  const insertionSort = () => {};
  const selectionSort = () => {};

  return {
    resetArray,
    array,
    bubbleSort,
    insertionSort,
    selectionSort,
    arrayNumber,
    handleArrayBarSliderChange,
  };
};

const SortingVisualizer = () => {
  const {
    resetArray,
    array,
    bubbleSort,
    insertionSort,
    selectionSort,
    arrayNumber,
    handleArrayBarSliderChange,
  } = SortingVisualizerFunctions();

  return (
    <div className="main-container">
      <div className="text-container">
        {array.map((value, idx) => (
          <div className="array-bar" key={idx} data-testid={`arrayBar`}>
            {value}-
          </div>
        ))}
      </div>
      {/* --------------------- BUTTONS --------------------- */}
      <ButtonsBar
        generateNewArray={() => resetArray(arrayNumber)}
        bubbleSort={bubbleSort}
        insertionSort={insertionSort}
        selectionSort={selectionSort}
      />
      {/* --------------------- BARS --------------------- */}
      <ArrayBar array={array} />

      {/* --------------------- SLIDERS --------------------- */}
      <Slider
        arrayNumber={arrayNumber}
        onChangeArrayBarSlider={handleArrayBarSliderChange}
      />
    </div>
  );
};

export default SortingVisualizer;
