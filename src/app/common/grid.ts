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

  cell(x: number, y: number): T[];
  find(t: T): ILocation;
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

  cell(x: number, y: number): T[] {
    throw new Error("not implemented");

  }

  find(t: T): ILocation {
    throw new Error("not implemented");

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
    return {
      x: (Math.random() * this.def.horizontal) & 0,
      y: (Math.random() * this.def.vertical) & 0
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
