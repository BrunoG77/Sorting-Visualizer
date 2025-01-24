import { describe, it, expect, vi } from "vitest";
// import { render, fireEvent, screen } from "@testing-library/react";
//import user from "@testing-library/user-event";
import { render, renderHook, act } from "@testing-library/react";

import SortingVisualizer from "./SortingVisualizer/SortingVisualizer.tsx";
import { SortingVisualizerFunctions } from "./SortingVisualizer/SortingVisualizer.tsx";
import * as HelperFuncs from "./SortingVisualizer/HelperFuncs.ts";

// Mock the HelperFuncs module
vi.mock("./SortingVisualizer/HelperFuncs.ts", async () => {
  const actual = await vi.importActual("./SortingVisualizer/HelperFuncs.ts");
  return {
    ...actual,
    playAudio: vi.fn(),
    disableButtons: vi.fn(),
  };
});

beforeEach(() => {
  vi.resetAllMocks();
});

describe("App - Component Test", () => {
  it("should create an array", async () => {
    const renderedApp = render(<SortingVisualizer />);
    const arrayBars = await renderedApp.findAllByTestId(/^arrayBar/);
    expect(arrayBars.length).toEqual(10);
  });

  it("should create an array | Function hook test", async () => {
    const { result } = renderHook(() => SortingVisualizerFunctions());

    expect(result.current.array.length).toEqual(10);
  });

  it("should create a new array when pressing the new array button | Function hook test", async () => {
    const { result } = renderHook(() => SortingVisualizerFunctions());

    // Get the array when loading the page
    const oldArray = result.current.array;

    // get the array number
    const arrayNumber = result.current.arrayNumber;

    // Simulate a user pressing the generate new array button
    act(() => {
      result.current.resetArray(arrayNumber);
    });

    // Get the new array after the button has been pressed
    const newArray = result.current.array;

    // Make sure that the arrays are different and the button works
    expect(oldArray).not.toEqual(newArray);
  });
});

// Test Sliders
describe("ArrayBarSlider tests", () => {
  it("should update array bars when slider is changed", () => {
    const { result } = renderHook(() => SortingVisualizerFunctions());

    const oldArrayNumber = result.current.arrayNumber;

    // Create a mock event object
    const mockEvent = {
      type: "change",
      target: { value: 5 },
    } as unknown as Event;

    act(() => {
      result.current.handleArrayBarSliderChange(mockEvent, 5);
    });

    const newArrayNumber = result.current.arrayNumber;

    expect(oldArrayNumber).not.toEqual(newArrayNumber);
  });

  it("should update animation speed when slider is changed", () => {
    const { result } = renderHook(() => SortingVisualizerFunctions());

    const oldSpeedNumber = result.current.animationSpeed;

    act(() => {
      result.current.handleAnimationSpeedSliderChange(15);
    });

    const newSpeedNumber = result.current.animationSpeed;

    expect(oldSpeedNumber).not.toEqual(newSpeedNumber);
  });
});

// Test Sorting Algorithms
describe("Sorting algorithms tests", () => {
  // Mock the disableButtons function
  vi.spyOn(HelperFuncs, "disableButtons").mockImplementation(() => {});

  it("should sort the array with bubble sort", () => {
    const { result } = renderHook(() => SortingVisualizerFunctions());

    const notSortedArray = [...result.current.array];

    // sort the initial array correctly to then compare if the sorting algorithm sorted correctly as well
    // ([...array]) is a spread operator to create a copy of the array to not modify the original array
    const correctlySortedArray = [...notSortedArray].sort((a, b) => a - b);

    // Perform bubble sort
    act(() => {
      result.current.bubbleSort();
    });

    const bubbleSortedArray = result.current.array;

    expect(bubbleSortedArray).toEqual(correctlySortedArray);
    expect(bubbleSortedArray).not.toEqual(notSortedArray);
    expect(HelperFuncs.disableButtons).toHaveBeenCalled();

    // Additional check: ensure the array is actually sorted
    for (let i = 1; i < bubbleSortedArray.length; i++) {
      expect(bubbleSortedArray[i]).toBeGreaterThanOrEqual(
        bubbleSortedArray[i - 1]
      );
    }
  });

  it("should sort the array with Insertion sort", () => {
    const { result } = renderHook(() => SortingVisualizerFunctions());

    const notSortedArray = [...result.current.array];

    // sort the initial array correctly to then compare if the sorting algorithm sorted correctly as well
    // ([...array]) is a spread operator to create a copy of the array to not modify the original array
    const correctlySortedArray = [...notSortedArray].sort((a, b) => a - b);

    // Perform insertion sort
    act(() => {
      result.current.insertionSort();
    });

    const insertionSortedArray = result.current.array;

    expect(insertionSortedArray).toEqual(correctlySortedArray);
    expect(insertionSortedArray).not.toEqual(notSortedArray);
    expect(HelperFuncs.disableButtons).toHaveBeenCalled();

    // Additional check: ensure the array is actually sorted
    for (let i = 1; i < insertionSortedArray.length; i++) {
      expect(insertionSortedArray[i]).toBeGreaterThanOrEqual(
        insertionSortedArray[i - 1]
      );
    }
  });

  it("should sort the array with Selection sort", () => {
    const { result } = renderHook(() => SortingVisualizerFunctions());

    const notSortedArray = [...result.current.array];

    // sort the initial array correctly to then compare if the sorting algorithm sorted correctly as well
    // ([...array]) is a spread operator to create a copy of the array to not modify the original array
    const correctlySortedArray = [...notSortedArray].sort((a, b) => a - b);

    // Perform insertion sort
    act(() => {
      result.current.selectionSort();
    });

    const selectionSortedArray = result.current.array;

    expect(selectionSortedArray).toEqual(correctlySortedArray);
    expect(selectionSortedArray).not.toEqual(notSortedArray);
    expect(HelperFuncs.disableButtons).toHaveBeenCalled();

    // Additional check: ensure the array is actually sorted
    for (let i = 1; i < selectionSortedArray.length; i++) {
      expect(selectionSortedArray[i]).toBeGreaterThanOrEqual(
        selectionSortedArray[i - 1]
      );
    }
  });
});
