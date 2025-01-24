/* useState is used to manage state in functional components, 
useEffect is used to handle side effects, such as fetching data or setting up event listeners.*/
import { useState, useEffect, useCallback } from "react";

/* Array bar*/
import ArrayBar from "./Components/ArrayBar/ArrayBar";

/* Buttons Bar */
import ButtonsBar from "./Components/ButtonsBar/ButtonsBar";

/* Sliders */
import Slider from "./Components/Sliders/Sliders";

/* Header */
import Header from "./Components/Header/Header";

/* Style*/
import "./SortingVisualizer.css";

/* Helper functions */
import { randomIntFromInterval, playAudio } from "./HelperFuncs";

/* Sorting Algorithms */
import BubbleSort from "./SortingAlgorithms/BubbleSort/BubbleSort";
import InsertionSort from "./SortingAlgorithms/InsertionSort/InsertionSort";
import SelectionSort from "./SortingAlgorithms/SelectionSort/SelectionSort";

/* Sounds */
import Reset from "./Sounds/Reset.wav";

// Functions to test
export const SortingVisualizerFunctions = () => {
  const [array, setArray] = useState<number[]>([]);
  const [arrayNumber, setNumberOfArrayBars] = useState(10);
  const [animationSpeed, setAnimationSpeed] = useState(100);

  const handleArrayBarSliderChange = (_event: Event, value: number) => {
    setNumberOfArrayBars(value as number);
  };

  const handleAnimationSpeedSliderChange = (value: number) => {
    setAnimationSpeed(value as number);
  };

  const resetArray = useCallback((newArrayNumber: number) => {
    const newArray = [];
    for (let i = 0; i < newArrayNumber; i++) {
      newArray.push(randomIntFromInterval(10, 100));
    }
    playAudio(Reset);
    setArray(newArray);
  }, []);

  /*This line uses the useEffect hook to run the resetArray function once when the component mounts.*/
  useEffect(() => {
    resetArray(arrayNumber);
  }, [arrayNumber, resetArray]);

  const bubbleSort = () => {
    BubbleSort(array, animationSpeed);
  };
  const insertionSort = () => {
    InsertionSort(array, animationSpeed);
  };
  const selectionSort = () => {
    SelectionSort(array, animationSpeed);
  };

  return {
    resetArray,
    array,
    bubbleSort,
    insertionSort,
    selectionSort,
    arrayNumber,
    handleArrayBarSliderChange,
    animationSpeed,
    handleAnimationSpeedSliderChange,
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
    animationSpeed,
    handleAnimationSpeedSliderChange,
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
      {/* --------------------- HEADER ---------------------- */}
      <Header />
      {/* --------------------- BUTTONS --------------------- */}
      <ButtonsBar
        generateNewArray={() => resetArray(arrayNumber)}
        bubbleSort={bubbleSort}
        insertionSort={insertionSort}
        selectionSort={selectionSort}
      />
      {/* --------------------- BARS ------------------------ */}
      <ArrayBar array={array} />

      {/* --------------------- SLIDERS --------------------- */}
      <Slider
        arrayNumber={arrayNumber}
        onChangeArrayBarSlider={handleArrayBarSliderChange}
        animationSpeed={animationSpeed}
        onChangeAnimationSpeedSlider={handleAnimationSpeedSliderChange}
      />
    </div>
  );
};

export default SortingVisualizer;
