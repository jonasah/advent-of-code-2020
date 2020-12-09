import { IPassport, PassportField } from './passport.model';
import { assert } from '../common/assert';

export const parsePassports = (input: string): Partial<IPassport>[] => {
  const sanitizedInput = input
    .trim()
    .split('\n')
    .map((line) => line.trim())
    .join('\n');

  return sanitizedInput.split('\n\n').map((input) => parsePassport(input));
};

const parsePassport = (input: string): Partial<IPassport> => {
  const fieldInputs = input.split(/\s+/);
  const fields = fieldInputs.map(parseField);

  return fields.reduce((p, c) => ({ ...p, [c.field]: c.value }), {});
};

const parseField = (input: string): { field: PassportField; value: string } => {
  const keyValuePair = input.split(':');
  assert(keyValuePair.length === 2, `Invalid key value pair: ${input}`);

  const [key, value] = keyValuePair;
  const field = Object.values(PassportField).find((field) => field === key);
  assert(field != null, `Invalid passport field: ${key}`);
  return { field, value };
};
