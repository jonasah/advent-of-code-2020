import fs from 'fs';
import path from 'path';

export const getInput = (day: number): string => {
  const inputPath = path.join(__dirname, '..', `day${day}`, 'input.txt');
  console.log(`Read input from ${inputPath}`);
  return fs.readFileSync(inputPath, 'utf-8').trim();
};
