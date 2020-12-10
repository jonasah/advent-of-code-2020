import { AssertionError } from 'assert';

export function assert(condition: unknown, message?: string): asserts condition {
  if (!condition) {
    throw new AssertionError({ message });
  }
}

export function assertUnreachable(): never {
  assert(false, 'Should not be here!');
}
