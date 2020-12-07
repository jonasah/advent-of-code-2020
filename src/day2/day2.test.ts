import {
  day2_1,
  day2_2,
  isValidPassword1,
  isValidPassword2,
  toPolicyPassword,
} from './day2';

describe('day2', () => {
  test.each([
    ['1-3 a: abcde', [1, 3, 'a', 'abcde']],
    ['1-3 b: cdefg', [1, 3, 'b', 'cdefg']],
    ['2-9 c: ccccccccc', [2, 9, 'c', 'ccccccccc']],
  ])('toPolicyPassword(%p) should be %p', (line, expected) => {
    const password = toPolicyPassword(line);
    expect(password).toEqual(expected);
  });

  describe('day2-1', () => {
    test.each([
      ['1-3 a: abcde', true],
      ['1-3 b: cdefg', false],
      ['2-9 c: ccccccccc', true],
    ])('isValidPassword1(%p) should be %p', (line, expected) => {
      const isValid = isValidPassword1(toPolicyPassword(line));
      expect(isValid).toBe(expected);
    });

    it('should have 2 valid passwords', () => {
      const input = ['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc'].map((i) =>
        toPolicyPassword(i)
      );
      const numValid = day2_1(input);
      expect(numValid).toBe(2);
    });
  });

  describe('day2-2', () => {
    test.each([
      ['1-3 a: abcde', true],
      ['1-3 b: cdefg', false],
      ['2-9 c: ccccccccc', false],
    ])('isValidPassword2(%p) should be %p', (line, expected) => {
      const isValid = isValidPassword2(toPolicyPassword(line));
      expect(isValid).toBe(expected);
    });

    it('should have 1 valid password', () => {
      const input = ['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc'].map((i) =>
        toPolicyPassword(i)
      );
      const numValid = day2_2(input);
      expect(numValid).toBe(1);
    });
  });
});
