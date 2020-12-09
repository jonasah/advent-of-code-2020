import { IPassport, PassportField } from './passport.model';
import { assert } from '../common/assert';

export const hasRequiredFields = (
  passport: Partial<IPassport>
): passport is IPassport => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { cid, ...required } = passport;
  return Object.values(required).length === Object.values(PassportField).length - 1;
};

export const isValidPassport = (passport: Partial<IPassport>): boolean => {
  if (!hasRequiredFields(passport)) {
    return false;
  }

  return Object.entries(passport).every(([field, value]) =>
    isValidField(field as PassportField, value)
  );
};

export const isValidField = (field: PassportField, value?: string): boolean => {
  if (field === PassportField.CountryId) {
    return true;
  }

  assert(value != null);
  return passportFieldValidators[field](value);
};

const passportFieldValidators: Record<
  keyof Omit<IPassport, PassportField.CountryId>,
  (value: string) => boolean
> = {
  [PassportField.BirthYear]: (value) => isInRange(parseInt(value), 1920, 2002),
  [PassportField.IssueYear]: (value) => isInRange(parseInt(value), 2010, 2020),
  [PassportField.ExpirationYear]: (value) => isInRange(parseInt(value), 2020, 2030),
  [PassportField.Height]: (value) => isValidHeight(value),
  [PassportField.HairColor]: (value) => hairColorRegexp.exec(value) != null,
  [PassportField.EyeColor]: (value) => validEyeColors.includes(value),
  [PassportField.PassportId]: (value) => passportIdRegexp.exec(value) != null,
};

const heightRegexp = new RegExp(/^(?:(\d{3})cm|(\d{2})in)$/);
const hairColorRegexp = new RegExp(/^#[\da-f]{6}$/);
const validEyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
const passportIdRegexp = new RegExp(/^\d{9}$/);

const isInRange = (value: number, min: number, max: number): boolean => {
  return min <= value && value <= max;
};

const isValidHeight = (value: string) => {
  const matches = heightRegexp.exec(value);
  if (matches == null) {
    return false;
  }

  const [, cmHeight, inHeight] = matches;
  if (cmHeight) {
    return isInRange(parseInt(cmHeight), 150, 193);
  }
  return isInRange(parseInt(inHeight), 59, 76);
};
