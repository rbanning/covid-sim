export interface IRange {
  min: number;
  max: number;
  readonly lowerQ: number;
  readonly middle: number;
  readonly upperQ: number;
  isInRange(value: number): boolean;
}

export class Range implements IRange {
  get lowerQ(): number { return Math.round((this.min + this.max) / 4); }
  get middle(): number { return Math.round((this.min + this.max) / 2); }
  get upperQ(): number { return Math.round((this.min + this.max) * 3 / 4); }

  constructor(public min: number, public max: number) { }

  isInRange(value): boolean {
    return value >= this.min && value <= this.max;
  }
}
