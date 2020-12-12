import {
  isValidNumber,
  day9_1,
  parseInput,
  day9_2,
  findContiguousSumSubData,
} from './day9';

describe('day9', () => {
  describe('day9-1', () => {
    test.each([
      [26, true],
      [49, true],
      [100, false],
      [50, false],
    ])('number %i should be valid: %p', (value, expected) => {
      const data = parseInput(preambleTestInput);
      const isValid = isValidNumber([...data, value], data.length, data.length);
      expect(isValid).toBe(expected);
    });

    it('should find 127 as the invalid number', () => {
      const value = day9_1(parseInput(testInput), 5);
      expect(value).toBe(127);
    });
  });

  describe('day9-2', () => {
    it('should find the contiguous sum sub data', () => {
      const subData = findContiguousSumSubData(parseInput(testInput), 127);
      expect(subData).toEqual([15, 25, 47, 40]);
    });

    it('should find 62 as the encryption weakness', () => {
      const value = day9_2(parseInput(testInput), 127);
      expect(value).toBe(62);
    });
  });
});

const testInput = `
35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`.trim();

const preambleTestInput = `
25
7
6
4
21
23
8
11
5
10
18
16
15
9
12
24
20
22
3
13
2
17
14
19
1`.trim();
