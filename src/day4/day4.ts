import fs from 'fs';
import path from 'path';
import { IPassport } from './passport.model';
import { hasRequiredFields, isValidPassport } from './passport-validators';
import { parsePassports } from './passport-parser';

export const day4 = (): void => {
  const passports = readInput();

  const result4_1 = day4_1(passports);
  console.log(`Day 4-1: ${result4_1}`);

  const result4_2 = day4_2(passports);
  console.log(`Day 4-2: ${result4_2}`);
};

export const day4_1 = (passports: Partial<IPassport>[]): number => {
  return passports.reduce(
    (sum, passport) => sum + (hasRequiredFields(passport) ? 1 : 0),
    0
  );
};

export const day4_2 = (passports: Partial<IPassport>[]): number => {
  return passports.reduce(
    (sum, passport) => sum + (isValidPassport(passport) ? 1 : 0),
    0
  );
};

const readInput = (): Partial<IPassport>[] => {
  const content = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');
  return parsePassports(content);
};
