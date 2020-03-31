import { ILocation, IHasLocation } from './location';
import { IHealth } from './health';
import { GUID } from './guid';

export interface IPerson extends IHasLocation {
  id: string;
  //location: ILocation;  (from IHasLocation)
  history: IHealth[];
  readonly currentHealth: IHealth;
  readonly initialHealth: IHealth;
}

export class Person implements IPerson {
  id: string;
  location: ILocation;
  history: IHealth[];
  get currentHealth(): IHealth {
    if (Array.isArray(this.history) && this.history.length > 0) {
      return this.history[this.history.length - 1];
    }
    //else
    console.warn("Cannot access person's current health", {person: this});
    return null;
  }
  get initialHealth(): IHealth {
    if (Array.isArray(this.history) && this.history.length > 0) {
      return this.history[0];
    }
    //else
    console.warn("Cannot access person's initial health", {person: this});
    return null;
  }

  constructor(health: IHealth, location: ILocation) {
    this.id = GUID.create().toString();
    this.history = [health];
    this.location = location;
  }
}
