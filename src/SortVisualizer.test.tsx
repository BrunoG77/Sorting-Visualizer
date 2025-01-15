import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
// import { render, fireEvent, within } from "@testing-library/react";
//import user from "@testing-library/user-event";
import { renderHook, act } from "@testing-library/react";

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

    // Simulate a user pressing the generate new array button
    act(() => {
      result.current.resetArray();
    });

    // Get the new array after the button has been pressed
    const newArray = result.current.array;

    // Make sure that the arrays are different and the button works
    expect(oldArray).not.toEqual(newArray);
  });
});
