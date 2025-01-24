import getBubbleSort from "./getBubbleSort.ts";
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
  comparingElement1: number;
  comparingElement2: number;
  doSwap: boolean;
  isFinalElement: boolean;
  finalElement: number;
}

const BubbleSort = (array: number[], animationSpeed: number): void => {
  disableButtons();

  const animations: Animation[] = getBubbleSort(array);

  for (let i = 0; i < animations.length; i++) {
    const {
      comparingElement1,
      comparingElement2,
      doSwap,
      isFinalElement,
      finalElement,
    } = animations[i];

    const promise1 = new Promise<void>((resolve) => {
      setTimeout(() => {
        changeBackgroundColor(comparingElement1, "rgba(255,165,0, 0.9)");
        changeBackgroundColor(comparingElement2, "rgba(255,165,0, 0.9)");

        if (doSwap) {
          changeBackgroundColor(comparingElement1, "rgba(144,238,144, 0.9)");
          changeBackgroundColor(comparingElement2, "rgba(144,238,144, 0.9)");
          swapBars(comparingElement1, comparingElement2);
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
          changeBackgroundColor(comparingElement1, "rgba(0, 13, 255, 0.5)");
          changeBoxShadow(comparingElement1, "rgba(0, 4, 255, 0.25)");
        }
        if (finalElement === 0) resolve();
      }, (i + 1) * animationSpeed);
    });

    Promise.all([promise1, promise2])
      .then(playCompletedSoundEffect)
      .then(enableButtons);
  }

  resetBarStyleDefault(array, (animations.length + 1) * animationSpeed);
};

export default BubbleSort;
