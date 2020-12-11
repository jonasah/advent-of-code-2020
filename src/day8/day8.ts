import _ from 'lodash';
import { getInput } from '../common/get-input';
import { assert, assertUnreachable } from '../common/assert';

export enum Operation {
  Accumulate = 'acc',
  Jump = 'jmp',
  NoOperation = 'nop',
}

interface IInstruction {
  operation: Operation;
  argument: number;
}

type Program = IInstruction[];

interface IExecutionResult {
  exitCode: 0 | 1;
  accumulator: number;
}

export const day8 = (): void => {
  const program = parseProgram(getInput(8));

  const result8_1 = day8_1(program);
  console.log(`Day 8-1: ${result8_1}`);

  const result8_2 = day8_2(program);
  console.log(`Day 8-2: ${result8_2}`);
};

export const day8_1 = (program: Program): number => {
  const { exitCode, accumulator } = runProgram(program);
  assert(exitCode === 1);
  return accumulator;
};

export const day8_2 = (program: Program): number => {
  const findIndexToToggle = (program: Program, fromIndex: number): number =>
    _.findIndex(
      program,
      (instruction) =>
        (instruction.operation === Operation.Jump && instruction.argument !== 1) ||
        (instruction.operation === Operation.NoOperation && instruction.argument !== 0),
      fromIndex
    );

  const toggleOperation = (operation: Operation) =>
    operation === Operation.Jump ? Operation.NoOperation : Operation.Jump;

  let indexToToggle = findIndexToToggle(program, 0);

  while (indexToToggle !== -1) {
    const instruction = program[indexToToggle];
    instruction.operation = toggleOperation(instruction.operation);

    const { exitCode, accumulator } = runProgram(program);
    instruction.operation = toggleOperation(instruction.operation);

    if (exitCode === 0) {
      return accumulator;
    }

    indexToToggle = findIndexToToggle(program, indexToToggle + 1);
  }

  assertUnreachable();
};

export const parseProgram = (input: string): Program => {
  return input.split('\n').map((line) => parseInstruction(line.trim()));
};

export const parseInstruction = (input: string): IInstruction => {
  const operationString = input.substring(0, 3);
  const argument = parseInt(input.substring(4));

  const operation = Object.values(Operation).find((op) => op === operationString);
  assert(operation, `Invalid operation: ${operationString}`);

  return {
    operation,
    argument,
  };
};

const runProgram = (program: Program): IExecutionResult => {
  let ip = 0;
  let accumulator = 0;

  const ipHistory: number[] = [];

  while (ip < program.length && !ipHistory.includes(ip)) {
    ipHistory.push(ip);
    const instruction = program[ip];

    switch (instruction.operation) {
      case Operation.Accumulate:
        accumulator += instruction.argument;
        ++ip;
        break;
      case Operation.Jump:
        ip += instruction.argument;
        break;
      case Operation.NoOperation:
        ++ip;
        break;
    }
  }

  return {
    exitCode: ip < program.length ? 1 : 0,
    accumulator,
  };
};
