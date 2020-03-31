import * as utils from './utilities';

export interface IDistribution {
  mean: number;
  stDev: number;
  random(size): number[];
  next(): number;
}

export class Distribution implements IDistribution {
  mean: number;
  stDev: number;

  constructor(mean = 0, stDev = 1) {
    this.mean = mean;
    this.stDev = stDev;
  }

  random(size): number[] {
    return utils.buildArray(size, _ => {
      return this.normalRandom();
    });
  }

  next(): number {
    //return this.random(1)[0];
    const next = this.random(1)[0];
    return next;
  }

  //generate standard normal random number
  //uses Marsaglia polar method
  //https://en.wikipedia.org/wiki/Marsaglia_polar_method
  private _spare: number = null;
  private normalRandom() {
    let val:number,
        x:number, y:number, //coords in square -1 < x < 1 and -1 < y < 1
        s:number, //sum of the coord squares
        mul:number;  // √(-2ln(s)/s)

    //use the spare from previous calls?
    if (this._spare !== null) {
      val = this._spare;
      this._spare = null; //reset
    }
    else
    {
      //calculate until 0 < s = x*x + y*y < 1
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;

        s = x * x + y * y; //sum of the squares
      } while (s === 0 || s >= 1);

      mul = Math.sqrt((-2 * Math.log(s)) / s);
      this._spare = y * mul;
      val = x * mul;
    }

    return this.mean + this.stDev * val;
  }
}
