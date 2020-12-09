import { day5_1, day5_2, IBoardingPass, parseBoardingPasses } from './day5';

describe('day5', () => {
  it('should parse boarding passes', () => {
    const boardingPasses = parseBoardingPasses(testInput);
    expect(boardingPasses).toEqual<typeof boardingPasses>([
      {
        row: 14,
        column: 7,
        seatId: 119,
      },
      {
        row: 44,
        column: 5,
        seatId: 357,
      },
      {
        row: 70,
        column: 7,
        seatId: 567,
      },
      {
        row: 102,
        column: 4,
        seatId: 820,
      },
    ]);
  });

  describe('day5-1', () => {
    it('should return highest seat id', () => {
      const boardingPasses = parseBoardingPasses(testInput);
      expect(day5_1(boardingPasses)).toBe(820);
    });
  });

  describe('day5-2', () => {
    it('should return seat id', () => {
      const boardingPasses: Pick<IBoardingPass, 'seatId'>[] = [
        {
          seatId: 7,
        },
        {
          seatId: 8,
        },
        {
          seatId: 9,
        },
        {
          seatId: 11,
        },
      ];
      expect(day5_2(boardingPasses)).toBe(10);
    });
  });
});

const testInput = `FBFBBFFRLR
BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL`;
