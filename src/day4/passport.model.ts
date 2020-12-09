export enum PassportField {
  BirthYear = 'byr',
  IssueYear = 'iyr',
  ExpirationYear = 'eyr',
  Height = 'hgt',
  HairColor = 'hcl',
  EyeColor = 'ecl',
  PassportId = 'pid',
  CountryId = 'cid',
}

export interface IPassport {
  [PassportField.BirthYear]: string;
  [PassportField.IssueYear]: string;
  [PassportField.ExpirationYear]: string;
  [PassportField.Height]: string;
  [PassportField.HairColor]: string;
  [PassportField.EyeColor]: string;
  [PassportField.PassportId]: string;
  [PassportField.CountryId]?: string;
}
