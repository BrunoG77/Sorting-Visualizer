interface Animation {
  currentIndex: number;
  comparingElement: number;
  currentMinIndex: number;
  doSwap: boolean;
  isFinalElement: boolean;
  finalElement: number;
}

const getSelectionSort = (array: number[]): Animation[] => {
  const animations: Animation[] = [];

  for (let i = 0; i < array.length; i++) {
    let currentIndexMin = i;

    for (let j = i + 1; j < array.length; j++) {
      animations.push({
        currentIndex: i,
        comparingElement: j,
        currentMinIndex: currentIndexMin,
        doSwap: false,
        isFinalElement: false,
        finalElement: -1,
      });

      // Get new minimum
      if (array[j] < array[currentIndexMin]) {
        currentIndexMin = j;

        animations.push({
          currentIndex: i,
          comparingElement: j,
          currentMinIndex: currentIndexMin,
          doSwap: false,
          isFinalElement: false,
          finalElement: -1,
        });
      }
    }

    if (i !== currentIndexMin) {
      // do the swap when at the end of array with min
      [array[i], array[currentIndexMin]] = [array[currentIndexMin], array[i]];

      animations.push({
        currentIndex: i,
        comparingElement: currentIndexMin,
        currentMinIndex: currentIndexMin,
        doSwap: true,
        isFinalElement: false,
        finalElement: -1,
      });
    }

    // reset colors of i before i++ in next iteration
    animations.push({
      currentIndex: i,
      comparingElement: i,
      currentMinIndex: i,
      doSwap: false,
      isFinalElement: true,
      finalElement: i,
    });
  }

  return animations;
};

export default getSelectionSort;
