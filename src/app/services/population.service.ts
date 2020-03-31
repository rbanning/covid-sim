import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPerson, Person } from '../common/person';
import { IAssumptions, InitialDistributionType } from '../common/assumptions';
import { ILocation } from '../common/location';
import { IHealth, Health, IHealthFactors, healthStatusEnum } from '../common/health';
import { IGrid, Grid } from '../common/grid';
import * as utils from '@app/common/utilities';

@Injectable()
export class PopulationService {
  private populationSubject = new BehaviorSubject<IPerson[]>([]);
  population$ = this.populationSubject.asObservable();
  grid: IGrid<IPerson>;
  assumptions: IAssumptions;

  constructor() { }

  initialize(assumptions: IAssumptions) {
    this.assumptions = assumptions;
    this.grid = new Grid(
      assumptions.grid,
      this.createPopulation(),
      assumptions.initial.location
    );

    this.populationSubject.next([...this.grid.population]);
  }

  private createPopulation(): IPerson[] {
    const population = utils.buildArray(this.assumptions.initial.size, _ => {
      return this.createPerson();
    });
    console.log("createPopulation", {population});
    return population;
  }

  private createPerson(location: ILocation = null): IPerson {
    location = location || { x: 0, y: 0 };

    //the random stuff
    const factors: IHealthFactors = {
      age: this.assumptions.initial.age.next(),
      health: this.assumptions.initial.health.next(),
      preexisting: this.assumptions.initial.preexisting.next()
    };
    const health: IHealth = {
      ...factors,
      spores: 0,
      immuneResponse: 0,
      contagious: 0,
      isDead: factors.health > 0,
      status: factors.health > 0 ? healthStatusEnum.no_contact : healthStatusEnum.dead
    };
    return new Person(new Health(health), location);
  }

  private randomLocation(): ILocation {
    return {
      x: Math.random() * this.assumptions.initial.size | 0,   // 0 <= x < size
      y: Math.random() * this.assumptions.initial.size | 0    // 0 <= y < size
    };
  }
}
