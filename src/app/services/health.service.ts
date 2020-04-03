import { Injectable } from '@angular/core';
import { IPerson } from '@app/common/person';
import { Range } from '@app/common/range';
import { IHealthUpdate, Health, healthStatusEnum, knownHealthStatusEnum } from '@app/common/health';
import * as utils from '@app/common/utilities';

@Injectable()
export class HealthService {
  readonly ranges = {
    age: new Range(0, 110),
    health: new Range(0, 10),
    preexisting: new Range(0, 10),
    spores: new Range(0, 10),
    immuneResponse: new Range(0, 10),
    contagious: new Range(0, 10),
    daysWithSpores: new Range(0, 14)
  }

  constructor() { }

  infect(p: IPerson, spores: number = null, immuneResponse: number = null) {
    if (!p) { throw new Error("HealthService.infect requires person parameter"); }
    spores = typeof spores === 'number' ? spores : this.ranges.spores.middle;
    immuneResponse = typeof immuneResponse === 'number' ? immuneResponse : this.ranges.immuneResponse.middle;

    this.updatePerson(p, { spores, immuneResponse });
  }

  updatePerson(p: IPerson, update: IHealthUpdate): IPerson {
    const condition = new Health({
      ...p.currentHealth,
      ...update
    });

    const daysWithSpores = p.numberOfContinuousDaysWithSpores(this.ranges.spores.min + 1);

    //adjust health based on the growth of spores, preexisting conditions, and how long with spores
    if (condition.spores > p.currentHealth.spores) {
      condition.health = Math.min(
        condition.health,
        Math.round(p.currentHealth.health -
            this.calcSporeEffect(
                p.currentHealth.spores,
                condition.spores,
                p.currentHealth.preexisting,
                daysWithSpores)
        )
      );
    }

    //adjust health based on immuneResponse
    if (condition.immuneResponse !== p.currentHealth.immuneResponse) {
      if (condition.immuneResponse > this.ranges.immuneResponse.upperQ) {
        condition.health = Math.round(condition.health * (1 - condition.immuneResponse)/this.ranges.immuneResponse.max);
      }
    }

    //don't go below the min health
    condition.health = Math.max(this.ranges.health.min, condition.health);

    //dead?
    condition.isDead = condition.health <= this.ranges.health.min;

    //adjust the health status
    if (condition.health !== p.currentHealth.health) {
      if (condition.isDead) {
        condition.status = knownHealthStatusEnum("dead");
      } else if (condition.spores === this.ranges.spores.min) {
        if (condition.status !== knownHealthStatusEnum("no_contact")) {
          condition.status = knownHealthStatusEnum("contact_recovered");
        }
      } else {
        if (condition.spores < this.ranges.spores.lowerQ) {
          if (condition.health > this.ranges.health.upperQ) {
            condition.status = knownHealthStatusEnum("contact_no_symptoms");
          } else if (condition.health > this.ranges.health.middle) {
            condition.status = knownHealthStatusEnum("contact_mild_symptoms");
          } else {
            condition.status = knownHealthStatusEnum("contact_mild_symptoms");
          }
        } else if (condition.spores < this.ranges.spores.middle) {
          if (condition.health > this.ranges.health.upperQ) {
            condition.status = knownHealthStatusEnum("contact_mild_symptoms");
          } else if (condition.health > this.ranges.health.middle) {
            condition.status = knownHealthStatusEnum("contact_full_symptoms");
          } else {
            condition.status = knownHealthStatusEnum("contact_hospitalized");
          }
        } else if (condition.spores < this.ranges.spores.upperQ) {
          if (condition.health > this.ranges.health.upperQ) {
            condition.status = knownHealthStatusEnum("contact_full_symptoms");
          } else if (condition.health > this.ranges.health.middle) {
            condition.status = knownHealthStatusEnum("contact_hospitalized");
          } else {
            condition.status = knownHealthStatusEnum("contact_critical");
          }
        }
      }
    }


    return p.updateHealth(condition);
  }

  private calcSporeEffect(sporse1: number, spores2: number, preexisting: number, daysWithSpores: number): number {
    const durationFactor = daysWithSpores > this.ranges.daysWithSpores.max ? 3 :
            (daysWithSpores > this.ranges.daysWithSpores.upperQ ? 2.5 :
            (daysWithSpores > this.ranges.daysWithSpores.middle ? 2 :
            (daysWithSpores > this.ranges.daysWithSpores.lowerQ ? 1.5 :
            (1))));

    return (spores2 - sporse1) / this.ranges.spores.lowerQ * (durationFactor + preexisting/this.ranges.preexisting.max);
  }

}
