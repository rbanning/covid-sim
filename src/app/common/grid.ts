import { ILocation, IHasLocation } from './location';
import { InitialDistributionType } from './assumptions';

export interface IGridDefinition {
  horizontal: number;
  vertical: number;
}

export interface IGridMoveResult<T extends IHasLocation> {
  oldLocation: ILocation;
  newLocation: ILocation;
  contacts: T[];
}


export interface IGrid<T extends IHasLocation> {
  readonly def: IGridDefinition;
  population: T[];

  asTable(): T[][][];
  cell(x: number, y: number): T[];
  find(t: T, key: string): ILocation;
  move(t: T, steps: number): IGridMoveResult<T>;
}

export class Grid<T extends IHasLocation> implements IGrid<T> {
  readonly def: IGridDefinition;
  population: T[];

  constructor(
    def: IGridDefinition,
    population: T[],
    distribution: InitialDistributionType
  ) {
    this.def = def;
    this.population = population;
    this.initialize(distribution);
  }

  asTable(): T[][][] {
    const ret = [];
    for (let y = 0; y < this.def.vertical; y++) {
      ret[y] = [];
      for (let x = 0; x < this.def.vertical; x++) {
        ret[y][x] = this.cell(x,y);
      }
    }

    console.log("grid as table", ret);
    return ret;
  }

  cell(x: number, y: number): T[] {
    return this.population.filter(p => p.location.x === x && p.location.y === y);
  }

  find(t: T, key: string = 'id'): ILocation {
    const ret = this.population.find(p => p[key] === t[key]);
    return !!ret ? ret.location : null;
  }

  move(t: T, steps: number): IGridMoveResult<T> {
    throw new Error("not implemented");
  }

  private initialize(distribution: InitialDistributionType) {
    let location: ILocation = null;
    this.population.forEach((p: IHasLocation) => {
      location = distribution === 'serial' ? this.serialLocation(location) : this.randomLocation();
      p.location = {...location};
    });
  }

  private randomLocation(): ILocation {
    //using bitwise OR (|) to trucate the random value
    return {
      x: (Math.random() * this.def.horizontal) | 0,
      y: (Math.random() * this.def.vertical) | 0
    };
  }
  private serialLocation(from: ILocation = null): ILocation {
    if (from === null) { return { x: 0, y: 0 }; }

    const ret: ILocation = {
      x: from.x + 1,
      y: from.y
    };
    if (ret.x >= this.def.horizontal) {
      ret.x = 0;
      ret.y++;
    }
    if (ret.y >= this.def.vertical) {
      ret.y = 0;
    }
    return ret;
  }

}
