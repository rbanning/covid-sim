import { PopulationService } from './population.service';
import { HealthService } from './health.service';

export const services = [
  HealthService,
  PopulationService
];

export * from './health.service';
export * from './population.service';

