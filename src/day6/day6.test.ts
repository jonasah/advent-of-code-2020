import { day6_1, day6_2, parseGroups } from './day6';

describe('day6', () => {
  it('should parse groups', () => {
    const groups = parseGroups(testInput);
    expect(groups).toEqual<typeof groups>([
      {
        answers: ['abc'],
        distinctAnswers: ['a', 'b', 'c'],
      },
      {
        answers: ['a', 'b', 'c'],
        distinctAnswers: ['a', 'b', 'c'],
      },
      {
        answers: ['ab', 'ac'],
        distinctAnswers: ['a', 'b', 'c'],
      },
      {
        answers: ['a', 'a', 'a', 'a'],
        distinctAnswers: ['a'],
      },
      {
        answers: ['b'],
        distinctAnswers: ['b'],
      },
    ]);
  });

  describe('day6-1', () => {
    it('should count number of questions where anyone answered yes', () => {
      const groups = parseGroups(testInput);
      expect(day6_1(groups)).toBe(11);
    });
  });

  describe('day6-2', () => {
    it('should count number of questions where everybody answered yes', () => {
      const groups = parseGroups(testInput);
      expect(day6_2(groups)).toBe(6);
    });
  });
});

const testInput = `abc

a
b
c

ab
ac

a
a
a
a

b`;
