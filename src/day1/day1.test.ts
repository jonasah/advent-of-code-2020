import { day1_1, day1_2 } from './day1';

describe('day1', () => {
  describe('day1-1', () => {
    test.each([
      [2020, 514579],
      [1345, 358314],
    ])('%p -> %p', (searchValue, expected) => {
      const result = day1_1([1721, 979, 366, 299, 675, 1456], searchValue);
      expect(result).toBe(expected);
    });
  });

  describe('day1-2', () => {
    test.each([[2020, 241861950]])('%p -> %p', (searchValue, expected) => {
      const result = day1_2([1721, 979, 366, 299, 675, 1456], searchValue);
      expect(result).toBe(expected);
    });
  });
});
