import { getInput } from '../common/get-input';

interface IGroup {
  answers: string[];
  distinctAnswers: string[];
}

export const day6 = (): void => {
  const groups = parseGroups(getInput(6));

  const result6_1 = day6_1(groups);
  console.log(`Day 6-1: ${result6_1}`);

  const result6_2 = day6_2(groups);
  console.log(`Day 6-2: ${result6_2}`);
};

export const day6_1 = (groups: IGroup[]): number => {
  return groups.reduce((acc, groups) => acc + groups.distinctAnswers.length, 0);
};

export const day6_2 = (groups: IGroup[]): number => {
  return groups.reduce(
    (acc, group) =>
      acc +
      group.distinctAnswers.filter((distinctAnswer) =>
        group.answers.every((answer) => answer.includes(distinctAnswer))
      ).length,
    0
  );
};

export const parseGroups = (input: string): IGroup[] => {
  const sanitizedInput = input
    .split('\n')
    .map((line) => line.trim())
    .join('\n');

  return sanitizedInput.split('\n\n').map(parseGroup);
};

const parseGroup = (input: string): IGroup => {
  const answers = input.split('\n');
  return {
    answers,
    distinctAnswers: answers.flatMap((a) => a.split('')).filter(distinct),
  };
};

const distinct = <T>(value: T, index: number, self: T[]) => self.indexOf(value) === index;
