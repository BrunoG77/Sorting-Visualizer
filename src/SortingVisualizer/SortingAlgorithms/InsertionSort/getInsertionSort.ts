interface Animation {
  comparingElement1: number;
  comparingElement2: number;
  doSwap: boolean;
  sortedIndex: number;
}

const getBubbleSort = (array: number[]): Animation[] => {
  //Prepare animation array
  const animations: Animation[] = [];

  for (let i = 1; i < array.length; i++) {
    // Create the one to compare to
    let j = i - 1;

    animations.push({
      comparingElement1: i,
      comparingElement2: j,
      doSwap: false,
      sortedIndex: j,
    });

    while (j >= 0 && array[j] > array[j + 1]) {
      // Push animation object for comparing 2 elements
      animations.push({
        comparingElement1: j,
        comparingElement2: j + 1,
        doSwap: false,
        sortedIndex: i,
      });

      // Do theoretical swap
      [array[j + 1], array[j]] = [array[j], array[j + 1]];

      // Push animation for swapping 2 values
      animations.push({
        comparingElement1: j,
        comparingElement2: j + 1,
        doSwap: true,
        sortedIndex: i,
      });

      j--;
    }
  }

  animations.push({
    comparingElement1: array.length - 1,
    comparingElement2: array.length - 1,
    doSwap: false,
    sortedIndex: array.length - 1,
  });
  console.log(`Array Sorted From get insertion ${array}`);
  return animations;
};

export default getBubbleSort;
