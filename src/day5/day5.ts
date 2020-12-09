import { getInput } from '../common/get-input';
import { assert } from '../common/assert';

export interface IBoardingPass {
  row: number;
  column: number;
  seatId: number;
}

export const day5 = (): void => {
  const boardingPasses = parseBoardingPasses(getInput(5));

  const result5_1 = day5_1(boardingPasses);
  console.log(`Day 5-1: ${result5_1}`);

  const result5_2 = day5_2(boardingPasses);
  console.log(`Day 5-2: ${result5_2}`);
};

export const day5_1 = (boardingPasses: Pick<IBoardingPass, 'seatId'>[]): number => {
  return boardingPasses[boardingPasses.length - 1].seatId;
};

export const day5_2 = (boardingPasses: Pick<IBoardingPass, 'seatId'>[]): number => {
  for (let i = 0; i < boardingPasses.length - 1; ++i) {
    const seatId1 = boardingPasses[i].seatId;
    const seatId2 = boardingPasses[i + 1].seatId;

    if (seatId2 - seatId1 === 2) {
      return seatId1 + 1;
    }
  }

  assert(false);
};

export const parseBoardingPasses = (input: string): IBoardingPass[] => {
  return input
    .split('\n')
    .map((line) => parseBoardingPass(line.trim()))
    .sort((a, b) => a.seatId - b.seatId);
};

const parseBoardingPass = (boardingPass: string): IBoardingPass => {
  const boardingPassRow = boardingPass.substring(0, 7);
  const boardingPassColumn = boardingPass.substring(7);

  const row = getValueBSP(boardingPassRow.split('').map((r) => (r === 'F' ? 'L' : 'U')));
  const column = getValueBSP(
    boardingPassColumn.split('').map((c) => (c === 'L' ? 'L' : 'U'))
  );

  return {
    row,
    column,
    seatId: row * 8 + column,
  };
};

const getValueBSP = (input: ('L' | 'U')[]): number => {
  return input.reduce<{ base: number; length: number }>(
    (acc, c) => {
      const newRange = acc.length / 2;
      return {
        base: c === 'L' ? acc.base : acc.base + newRange,
        length: newRange,
      };
    },
    {
      base: 0,
      length: Math.pow(2, input.length),
    }
  ).base;
};
