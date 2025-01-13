import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
// import { render, fireEvent, within } from "@testing-library/react";
//import user from "@testing-library/user-event";
import SortingVisualizer from "./SortingVisualizer/SortingVisualizer.tsx";

describe("App - Component Test", () => {
  it("should create a new array", async () => {
    const renderedApp = render(<SortingVisualizer />);
    const arrayBars = await renderedApp.findAllByTestId(/^arrayBar/);
    expect(arrayBars.length).toEqual(10);
  });
});
