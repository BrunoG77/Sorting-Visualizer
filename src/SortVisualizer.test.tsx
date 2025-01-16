import { describe, it, expect } from "vitest";
// import { render, fireEvent, screen } from "@testing-library/react";
//import user from "@testing-library/user-event";
import { render, renderHook, act } from "@testing-library/react";

import SortingVisualizer from "./SortingVisualizer/SortingVisualizer.tsx";
import { SortingVisualizerFunctions } from "./SortingVisualizer/SortingVisualizer.tsx";

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
});
