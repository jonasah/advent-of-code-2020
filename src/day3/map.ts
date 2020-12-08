import { assert } from '../common/assert';

export enum SquareType {
  Open = 'open',
  Tree = 'tree',
}

export class Map {
  // x = 0, y = 0 in top-left corner
  public readonly size: { internalWidth: number; height: number };

  private readonly internalMap: SquareType[][];

  constructor(input: string[]) {
    this.internalMap = input.map((i): SquareType[] => {
      return i
        .split('')
        .map((square) => (square === '.' ? SquareType.Open : SquareType.Tree));
    });

    this.size = {
      internalWidth: this.internalMap[0].length,
      height: this.internalMap.length,
    };
  }

  public getSquare(x: number, y: number): SquareType {
    assert(x >= 0, `Invalid X coordinate: ${x}`);
    assert(
      y >= 0 && y < this.size.height,
      `Invalid Y coordinate: ${y}, map height: ${this.size.height}`
    );

    const wrappedX = x % this.size.internalWidth;
    return this.internalMap[y][wrappedX];
  }
}
