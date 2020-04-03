import { ILocation, IHasLocation } from './location';
import { IHealth, IHealthUpdate, Health } from './health';
import { GUID } from './guid';

export interface IPerson extends IHasLocation {
  id: string;
  //location: ILocation;  (from IHasLocation)
  history: IHealth[];
  readonly currentHealth: IHealth;
  readonly health: IHealth; //alias of currentHealth
  readonly initialHealth: IHealth;
  updateHealth(h: IHealth): IPerson;
  numberOfContinuousDaysWithSpores(minSporeCount: number): number;
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
  get health(): IHealth {
    //alias
    return this.currentHealth;
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

  updateHealth(update: IHealth | IHealthUpdate): IPerson {
    const condition = new Health({
      ...this.currentHealth,
      ...update
    });
    //adjust
    condition.isDead = condition.health <= 0;

    //set
    this.history.push(condition);
    return this;
  }

  numberOfContinuousDaysWithSpores(minSporeCount: number): number {
    let count = 0;
    let hasSpores = true; //flag
    for (let i = this.history.length - 1; i > 0 && hasSpores; i--) {
      if (this.history[i].spores >= minSporeCount) {
        count++;
      } else {
        hasSpores = false;
      }
    }
    return count;
  }

}
