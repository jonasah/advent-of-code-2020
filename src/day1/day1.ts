import { assert } from '../common/assert';
import { getInput } from '../common/get-input';

export const day1 = (): void => {
  const input = readInput();

  const result1_1 = day1_1(input, 2020);
  console.log(`Day 1-1: ${result1_1}`);

  const result1_2 = day1_2(input, 2020);
  console.log(`Day 1-2: ${result1_2}`);
};

export const day1_1 = (entries: number[], searchValue: number): number => {
  // sort in ascending order
  const sortedEntries = [...entries].sort((a, b) => a - b);

  let i1 = 0;
  let i2 = sortedEntries.length - 1;

  while (i1 !== i2) {
    const entry1 = sortedEntries[i1];
    const entry2 = sortedEntries[i2];

    const sum = entry1 + entry2;

    if (sum === searchValue) {
      // found the answer
      return entry1 * entry2;
    }
    if (sum < searchValue) {
      ++i1;
    } else {
      --i2;
    }
  }

  assert(false);
};

export const day1_2 = (entries: number[], searchValue: number): number => {
  for (let i = 0; i < entries.length; ++i) {
    for (let j = 0; j < entries.length; ++j) {
      for (let k = 0; k < entries.length; ++k) {
        const entry1 = entries[i];
        const entry2 = entries[j];
        const entry3 = entries[k];

        if (entry1 + entry2 + entry3 === searchValue) {
          return entry1 * entry2 * entry3;
        }
      }
    }
  }

  assert(false);
};

const readInput = (): number[] => {
  return getInput(1)
    .split('\n')
    .map((line) => parseInt(line.trim()));
};
