import { IColorRgba, ColorRgba } from './color';

export interface IHealthStatus {
  code: string;
  color: IColorRgba;
  text: string;
}

export type StatusEnumKey = "no_contact" | "contact_recovered" | "contact_no_symptoms" | "contact_mild_symptoms" | "contact_full_symptoms" | "contact_hospitalized" | "contact_critical" | "dead";
export const healthStatusEnum: {[key: string]: IHealthStatus} = {
  no_contact: {code: "no_contact", text: 'No Contact', color: new ColorRgba('#FFF0E0')},
  contact_recovered: {code: "contact_recovered", text: "Recovered", color: new ColorRgba('#00B0B0')},
  contact_no_symptoms: {code: "contact_no_symptoms", text: "No Symptoms", color: new ColorRgba('#0000FF')},
  contact_mild_symptoms: {code: "contact_mild_symptoms", text: "Mild Symptoms", color: new ColorRgba('#FF00FF')},
  contact_full_symptoms: {code: "contact_full_symptoms", text: "Full Symptoms", color: new ColorRgba('#FFFF00')},
  contact_hospitalized: {code: "contact_hospitalized", text: "Hospitalized", color: new ColorRgba('#FF7231')},
  contact_critical: {code: "contact_critical", text: "Critical Condition", color: new ColorRgba('#FF0000')},
  dead: {code: "dead", text: "Dead", color: new ColorRgba('#000000')}
};
export const knownHealthStatusEnum = (key: StatusEnumKey): IHealthStatus => {
  return healthStatusEnum[key];
}

export interface IHealthFactors {
  //health factors
  age: number;              //age in years
  health: number;           //general health                (0 = dead, 1 = critical, 10 = healthy)
  preexisting: number;      //health factors                (0 = none, 1 = minor, 10 = severely compromised)
}

export interface IHealth extends IHealthFactors {
  status: IHealthStatus;

  //disease
  spores: number;           //number of spores              (0 = none, 10 = max number possible)
  immuneResponse: number;   //immune cells as response      (0 = none, 7 = full healthy response, 10 = over response)

  contagious: number;      //how contagious                 (0 = not contagious, 10 = highly contagious)
  isDead: boolean;
}

export interface IHealthUpdate {
  age?: number;
  health?: number;
  spores: number;           //required
  immuneResponse: number;   //required
  contagious?: number;
}


export class Health implements IHealth {
  status: IHealthStatus = healthStatusEnum.dead;

  age: number;
  health: number;
  preexisting: number;

  spores: number;
  immuneResponse: number;

  contagious: number;
  isDead: boolean;

  constructor(obj: any = null) {
    if (obj) {
      this.status = typeof(obj.status) === 'string' ? healthStatusEnum[obj.status] : obj.status;
      this.age = obj.age;
      this.health = obj.health;
      this.preexisting = obj.preexisting;
      this.spores = obj.spores;
      this.immuneResponse = obj.immuneResponse;
      this.contagious = obj.contagious;
      this.isDead = obj.isDead;
    }
  }
}
