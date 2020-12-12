import { assert, assertUnreachable } from '../common/assert';
import { findMatchingPair } from '../day1/find-matching-pair';
import { getInput } from '../common/get-input';
import _ from 'lodash';

export const day9 = (): void => {
  const data = parseInput(getInput(9));

  const result9_1 = day9_1(data, 25);
  console.log(`Day 9-1: ${result9_1}`);

  const result9_2 = day9_2(data, result9_1);
  console.log(`Day 9-2: ${result9_2}`);
};

export const day9_1 = (data: number[], preambleLength: number): number => {
  let index = preambleLength;

  while (isValidNumber(data, index, preambleLength)) {
    ++index;
  }

  return data[index];
};

export const day9_2 = (data: number[], invalidNumber: number): number => {
  const subData = findContiguousSumSubData(data, invalidNumber);
  const [min, max] = minMax(...subData);
  return min + max;
};

export const parseInput = (input: string): number[] => {
  return input.split('\n').map((line) => parseInt(line.trim()));
};

export const isValidNumber = (
  data: number[],
  index: number,
  preambleLength: number
): boolean => {
  assert(preambleLength <= index, `Invalid index: ${index} > ${preambleLength}`);

  const preamble = data.slice(index - preambleLength, index);
  return findMatchingPair(preamble, data[index]) != null;
};

export const findContiguousSumSubData = (data: number[], searchSum: number): number[] => {
  const range = {
    startIndex: 0,
    endIndex: 2, // exclusive
  };

  while (range.endIndex < data.length) {
    const subData = data.slice(range.startIndex, range.endIndex);
    const sum = _.sum(subData);

    if (sum === searchSum) {
      return subData;
    }

    if (sum >= searchSum) {
      ++range.startIndex;
    } else {
      ++range.endIndex;
    }

    // always include at least two numbers
    range.endIndex = Math.max(range.endIndex, range.startIndex + 2);
  }

  assertUnreachable();
};

const minMax = (...values: number[]): [number, number] => [
  Math.min(...values),
  Math.max(...values),
];
