interface Animation {
  comparingElement1: number;
  comparingElement2: number;
  doSwap: boolean;
  isFinalElement: boolean;
  finalElement: number;
}

const getBubbleSort = (array: number[]): Animation[] => {
  const animations: Animation[] = [];

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      // Push animation object for comparing 2 elements
      animations.push({
        comparingElement1: j,
        comparingElement2: j + 1,
        doSwap: false,
        isFinalElement: false,
        finalElement: -1,
      });

      if (array[j] > array[j + 1]) {
        // Swap values
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        // Push animation for swapping 2 values
        animations.push({
          comparingElement1: j,
          comparingElement2: j + 1,
          doSwap: true,
          isFinalElement: false,
          finalElement: -1,
        });
      }
    }
    // Here, the (array.length - 1 - i)th indexed element will be sorted. So we need to change its color.
    // Push animation for (array.length - 1 - i)th indexed element which got its sorted position.
    animations.push({
      comparingElement1: array.length - 1 - i,
      comparingElement2: array.length - 1 - i,
      doSwap: false,
      isFinalElement: true,
      finalElement: array.length - 1 - i,
    });
  }
  // Push animation to know that it's the end of the animation.
  animations.push({
    comparingElement1: 0,
    comparingElement2: 0,
    doSwap: false,
    isFinalElement: true,
    finalElement: 0,
  });

  return animations;
};

export default getBubbleSort;
