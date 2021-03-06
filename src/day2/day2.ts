import { assert } from '../common/assert';
import { getInput } from '../common/get-input';

export type IPolicyPassword = [number, number, string, string];

export const day2 = (): void => {
  const passwords = getInput(2).split('\n').map(toPolicyPassword);

  const result1_1 = day2_1(passwords);
  console.log(`Day 2-1: ${result1_1}`);

  const result1_2 = day2_2(passwords);
  console.log(`Day 2-2: ${result1_2}`);
};

export const day2_1 = (policyPasswords: IPolicyPassword[]): number => {
  return policyPasswords.filter((p) => isValidPassword1(p)).length;
};

export const day2_2 = (policyPasswords: IPolicyPassword[]): number => {
  return policyPasswords.filter((p) => isValidPassword2(p)).length;
};

const regexp = new RegExp(/^(\d+)-(\d+)\s(\w):\s(\w+)$/);

export const toPolicyPassword = (line: string): IPolicyPassword => {
  const matches = regexp.exec(line.trim());
  assert(matches);
  return [parseInt(matches[1]), parseInt(matches[2]), matches[3], matches[4]];
};

export const isValidPassword1 = (policyPassword: IPolicyPassword): boolean => {
  const [lowerLimit, upperLimit, letter, password] = policyPassword;
  const numMatchingLetters = password.split('').filter((l) => l === letter).length;
  return numMatchingLetters >= lowerLimit && numMatchingLetters <= upperLimit;
};

export const isValidPassword2 = (policyPassword: IPolicyPassword): boolean => {
  const [position1, position2, letter, password] = policyPassword;
  const isValidPosition1 = password[position1 - 1] === letter ? 1 : 0;
  const isValidPosition2 = password[position2 - 1] === letter ? 1 : 0;
  return (isValidPosition1 ^ isValidPosition2) === 1;
};
