export const findMatchingPair = (
  entries: number[],
  searchValue: number
): [number, number] | undefined => {
  // sort in ascending order
  const sortedEntries = [...entries].sort((a, b) => a - b);

  let i1 = 0;
  let i2 = sortedEntries.length - 1;

  while (i1 !== i2) {
    const entry1 = sortedEntries[i1];
    const entry2 = sortedEntries[i2];

    const sum = entry1 + entry2;

    if (sum === searchValue) {
      return [entry1, entry2];
    }

    if (sum < searchValue) {
      ++i1;
    } else {
      --i2;
    }
  }
};
