import { day8_1, day8_2, Operation, parseInstruction, parseProgram } from './day8';

describe('day8', () => {
  it.each([
    ['nop +0', { operation: Operation.NoOperation, argument: 0 }],
    ['acc -42', { operation: Operation.Accumulate, argument: -42 }],
    ['jmp +100', { operation: Operation.Jump, argument: 100 }],
  ])('should parse instruction: %s', (instruction, expected) => {
    expect(parseInstruction(instruction)).toEqual(expected);
  });

  it('should parse program', () => {
    const program = parseProgram(testInput);
    expect(program).toHaveLength(9);
  });

  describe('day8-1', () => {
    it('should have accumulator value 5 when an instruction is repeated', () => {
      const accumulator = day8_1(parseProgram(testInput));
      expect(accumulator).toBe(5);
    });
  });

  describe('day8-2', () => {
    it('should have accumulator value 8 when program exits correctly', () => {
      const accumulator = day8_2(parseProgram(testInput));
      expect(accumulator).toBe(8);
    });
  });
});

const testInput = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;
