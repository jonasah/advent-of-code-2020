import { day3_1, day3_2, parseMap, traverseSlope } from './day3';
import { Map, SquareType } from './map';

const testInput = `
..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#
`.trim();

describe('day3', () => {
  let map: Map;

  beforeAll(() => {
    map = parseMap(testInput);
  });

  it('should parse map', () => {
    expect(map.size).toEqual({ internalWidth: 11, height: 11 });
    expect(map.getSquare(0, 0)).toBe(SquareType.Open);
    expect(map.getSquare(1, 4)).toBe(SquareType.Tree);
  });

  test.each([
    [0, 0, SquareType.Open],
    [2, 6, SquareType.Open],
    [6, 2, SquareType.Tree],
    [10, 10, SquareType.Tree],
    [25, 5, SquareType.Open], // should wrap X coordinate
  ])('square (%i,%i) should be %s', (x, y, expected) => {
    expect(map.getSquare(x, y)).toBe(expected);
  });

  test.each([
    [1, 1, 2],
    [3, 1, 7],
    [5, 1, 3],
    [7, 1, 4],
    [1, 2, 2],
  ])('slope [%i,%i] should encounter %i trees', (right, down, expected) => {
    expect(traverseSlope(map, [right, down])).toBe(expected);
  });

  describe('day3-1', () => {
    it('should encounter 7 trees', () => {
      const encounters = day3_1(map);
      expect(encounters).toBe(7);
    });
  });

  describe('day3-2', () => {
    it('should return 336', () => {
      const result = day3_2(map);
      expect(result).toBe(336);
    });
  });
});
