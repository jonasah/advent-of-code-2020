import { PassportField } from './passport.model';
import { parsePassports } from './passport-parser';
import { hasRequiredFields, isValidField } from './passport-validators';
import { day4_1, day4_2 } from './day4';

describe('day4', () => {
  it('should parse passports', () => {
    const passports = parsePassports(day4_1_testInput);
    expect(passports).toHaveLength(4);
    expect(passports).toEqual<typeof passports>([
      {
        [PassportField.BirthYear]: '1937',
        [PassportField.IssueYear]: '2017',
        [PassportField.ExpirationYear]: '2020',
        [PassportField.Height]: '183cm',
        [PassportField.HairColor]: '#fffffd',
        [PassportField.EyeColor]: 'gry',
        [PassportField.PassportId]: '860033327',
        [PassportField.CountryId]: '147',
      },
      {
        [PassportField.BirthYear]: '1929',
        [PassportField.IssueYear]: '2013',
        [PassportField.ExpirationYear]: '2023',
        [PassportField.HairColor]: '#cfa07d',
        [PassportField.EyeColor]: 'amb',
        [PassportField.PassportId]: '028048884',
        [PassportField.CountryId]: '350',
      },
      {
        [PassportField.BirthYear]: '1931',
        [PassportField.IssueYear]: '2013',
        [PassportField.ExpirationYear]: '2024',
        [PassportField.Height]: '179cm',
        [PassportField.HairColor]: '#ae17e1',
        [PassportField.EyeColor]: 'brn',
        [PassportField.PassportId]: '760753108',
      },
      {
        [PassportField.IssueYear]: '2011',
        [PassportField.ExpirationYear]: '2025',
        [PassportField.Height]: '59in',
        [PassportField.HairColor]: '#cfa07d',
        [PassportField.EyeColor]: 'brn',
        [PassportField.PassportId]: '166559648',
      },
    ]);
  });

  describe('day4-1', () => {
    it('should validate passports correctly', () => {
      const passports = parsePassports(day4_1_testInput);
      const isValidPassports = passports.map((p) => hasRequiredFields(p));
      expect(isValidPassports).toEqual<typeof isValidPassports>([
        true,
        false,
        true,
        false,
      ]);
    });

    it('should have 2 valid passports', () => {
      const passports = parsePassports(day4_1_testInput);
      expect(day4_1(passports)).toBe(2);
    });
  });

  describe('day4-2', () => {
    test.each([
      [PassportField.BirthYear, '2002', true],
      [PassportField.BirthYear, '2003', false],
      [PassportField.Height, '60in', true],
      [PassportField.Height, '190cm', true],
      [PassportField.Height, '190in', false],
      [PassportField.Height, '190', false],
      [PassportField.HairColor, '#123abc', true],
      [PassportField.HairColor, '#123abz', false],
      [PassportField.HairColor, '123abc', false],
      [PassportField.EyeColor, 'brn', true],
      [PassportField.EyeColor, 'wat', false],
      [PassportField.PassportId, '000000001', true],
      [PassportField.PassportId, '0123456789', false],
    ])('isValidField(%s, %s) should be %p', (field, value, expected) => {
      const isValid = isValidField(field, value);
      expect(isValid).toBe(expected);
    });

    it('should validate passports', () => {
      const passports = parsePassports(day4_2_validTestInput);
      expect(day4_2(passports)).toBe(passports.length);
    });

    it('should invalidate passports', () => {
      const passports = parsePassports(day4_2_invalidTestInput);
      expect(day4_2(passports)).toBe(0);
    });
  });
});

const day4_1_testInput = `
ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`.trim();

const day4_2_invalidTestInput = `
eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007`.trim();

const day4_2_validTestInput = `
pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`.trim();
