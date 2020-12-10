import { totalBagsNeeded, day7_1, day7_2, parseRule, parseRules } from './day7';

describe('day7', () => {
  it.each([
    [
      'faded blue bags contain no other bags.',
      {
        bag: 'faded blue',
        contains: [],
      },
    ],
    [
      'bright white bags contain 1 shiny gold bag.',
      {
        bag: 'bright white',
        contains: [['shiny gold', 1]],
      },
    ],
    [
      'light red bags contain 1 bright white bag, 2 muted yellow bags.',
      {
        bag: 'light red',
        contains: [
          ['bright white', 1],
          ['muted yellow', 2],
        ],
      },
    ],
  ])('should parse rule: %p', (input, expected) => {
    const rule = parseRule(input);
    expect(rule).toEqual(expected);
  });

  it('should parse all rules', () => {
    const graph = parseRules(testInput);
    expect(graph.nodes).toHaveLength(9);
  });

  describe('day7-1', () => {
    it('should find 4 bags', () => {
      const graph = parseRules(testInput);
      expect(day7_1(graph, 'shiny gold')).toBe(4);
    });
  });

  describe('day7-2', () => {
    it.each([
      [1, 'faded blue'],
      [1, 'dotted black'],
      [8, 'dark olive'],
      [12, 'vibrant plum'],
      [33, 'shiny gold'],
    ])('should require %i %s bags', (expected, bag) => {
      const graph = parseRules(testInput);
      expect(totalBagsNeeded(graph, bag)).toBe(expected);
    });

    it('should require 32 bags inside', () => {
      const graph = parseRules(testInput);
      expect(day7_2(graph, 'shiny gold')).toBe(32);
    });

    it('should require 126 bags inside', () => {
      const graph = parseRules(testInput2);
      expect(day7_2(graph, 'shiny gold')).toBe(126);
    });
  });
});

const testInput = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

const testInput2 = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`;
