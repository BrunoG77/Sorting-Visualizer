import getSelectionSort from "./getSelectionSort";
import {
  changeBackgroundColor,
  changeBoxShadow,
  swapBars,
  resetBarStyleDefault,
  disableButtons,
  enableButtons,
  playCompletedSoundEffect,
} from "../../HelperFuncs";

interface Animation {
  currentIndex: number;
  comparingElement: number;
  currentMinIndex: number;
  doSwap: boolean;
  isFinalElement: boolean;
  finalElement: number;
}

const SelectionSort = (array: number[], animationSpeed: number): void => {
  disableButtons();

  const animations: Animation[] = getSelectionSort(array);

  for (let i = 0; i < animations.length; i++) {
    const {
      currentIndex,
      comparingElement,
      currentMinIndex,
      doSwap,
      isFinalElement,
      finalElement,
    } = animations[i];

    const promise1 = new Promise<void>((resolve) => {
      setTimeout(() => {
        changeBackgroundColor(currentMinIndex, "rgba(228, 11, 11, 0.9)");
        changeBackgroundColor(currentIndex, "rgba(0, 0, 0, 0.9)");
        changeBackgroundColor(comparingElement, "rgba(255,165,0, 0.9)");

        if (doSwap) {
          changeBackgroundColor(currentIndex, "rgba(144,238,144, 0.9)");
          changeBackgroundColor(comparingElement, "rgba(144,238,144, 0.9)");
          swapBars(currentIndex, comparingElement);
        }
        resolve();
      }, i * animationSpeed);
    });

    const promise2 = new Promise<void>((resolve) => {
      setTimeout(() => {
        if (isFinalElement) {
          changeBackgroundColor(finalElement, "rgba(0, 164, 86, 0.6)");
          changeBoxShadow(
            finalElement,
            "5px 5px 50px 5px  rgba(0, 164, 86, 0.2)"
          );
        } else {
          changeBackgroundColor(comparingElement, "rgba(0, 13, 255, 0.5)");
          changeBoxShadow(comparingElement, "rgba(0, 4, 255, 0.25)");
          changeBackgroundColor(currentMinIndex, "rgba(0, 13, 255, 0.5)");
          changeBoxShadow(currentMinIndex, "rgba(0, 4, 255, 0.25)");
        }
        if (finalElement == array.length - 1) resolve();
      }, (i + 1) * animationSpeed);
    });

    Promise.all([promise1, promise2])
      .then(playCompletedSoundEffect)
      .then(enableButtons);
  }

  resetBarStyleDefault(array, (animations.length + 1) * animationSpeed);
};

export default SelectionSort;
