import { IDistribution, Distribution } from './distribution';
import { IGridDefinition } from './grid';

export type InitialDistributionType = 'random' | 'serial';

export interface IAssumptionsInitialPopulation {
  size: number;
  age: IDistribution;
  health: IDistribution;
  preexisting: IDistribution;
  location: InitialDistributionType
}

export interface IAssumptions {
  grid: IGridDefinition;
  initial: IAssumptionsInitialPopulation;
  contact: IDistribution;
}

const starterInitialPopulationAssumptions: IAssumptionsInitialPopulation = {
  size: 100,
  age: new Distribution(38, 12),
  health: new Distribution(8, 0.5),
  preexisting: new Distribution(2, 0.5),
  location: 'serial'
}

export const starterAssumptions: IAssumptions = {
  grid: {
    horizontal: 10,
    vertical: 10
  },
  initial: starterInitialPopulationAssumptions,
  contact: new Distribution()
};
