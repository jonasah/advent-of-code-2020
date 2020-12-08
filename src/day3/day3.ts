import fs from 'fs';
import path from 'path';
import { Map, SquareType } from './map';

export type Slope = [number, number];

export const day3 = (): void => {
  const map = readInput();

  const result3_1 = day3_1(map);
  console.log(`Day 3-1: ${result3_1}`);

  const result3_2 = day3_2(map);
  console.log(`Day 3-2: ${result3_2}`);
};

export const day3_1 = (map: Map): number => {
  return traverseSlope(map, [3, 1]);
};

export const day3_2 = (map: Map): number => {
  const slopes: Slope[] = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];

  return slopes.reduce((p, c) => p * traverseSlope(map, c), 1);
};

const readInput = (): Map => {
  const content = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
  return parseMap(content);
};

export const parseMap = (input: string): Map =>
  new Map(
    input
      .trim()
      .split('\n')
      .map((line) => line.trim())
  );

export const traverseSlope = (map: Map, slope: Slope): number => {
  const [right, down] = slope;
  let x = right;
  let y = down;
  let trees = 0;

  while (y < map.size.height) {
    if (map.getSquare(x, y) === SquareType.Tree) {
      ++trees;
    }

    x += right;
    y += down;
  }

  return trees;
};
