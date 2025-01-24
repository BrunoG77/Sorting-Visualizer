import React from "react";
import "./ButtonsBar.css";

interface ButtonProps {
  generateNewArray: () => void;
  bubbleSort: () => void;
  insertionSort: () => void;
  selectionSort: () => void;
}

const ButtonsBar: React.FC<ButtonProps> = ({
  generateNewArray,
  bubbleSort,
  insertionSort,
  selectionSort,
}) => {
  return (
    <div className="buttons-bar">
      <button id="reset" onClick={generateNewArray}>
        Generate New Array
      </button>
      <button
        id="bubbleSortButton"
        onClick={bubbleSort}
        className="buttonStyle1"
      >
        Bubble Sort
      </button>
      <button
        id="selectionSortButton"
        onClick={selectionSort}
        className="buttonStyle2"
      >
        Selection Sort
      </button>
      <button
        id="insertionSortButton"
        onClick={insertionSort}
        className="buttonStyle1"
      >
        Insertion Sort
      </button>
    </div>
  );
};

export default ButtonsBar;
