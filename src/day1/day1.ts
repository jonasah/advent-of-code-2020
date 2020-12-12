import { assert } from '../common/assert';
import { getInput } from '../common/get-input';
import { findMatchingPair } from './find-matching-pair';

export const day1 = (): void => {
  const input = readInput();

  const result1_1 = day1_1(input, 2020);
  console.log(`Day 1-1: ${result1_1}`);

  const result1_2 = day1_2(input, 2020);
  console.log(`Day 1-2: ${result1_2}`);
};

export const day1_1 = (entries: number[], searchValue: number): number => {
  const match = findMatchingPair(entries, searchValue);
  assert(match);
  return match[0] * match[1];
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
