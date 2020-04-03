import { Component, OnInit } from '@angular/core';
import { PopulationService } from 'src/app/services';
import { Observable } from 'rxjs';
import { IPerson } from 'src/app/common/person';
import { IAssumptions, starterAssumptions } from 'src/app/common/assumptions';
import { ILocation } from '@app/common/location';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  population$: Observable<IPerson[]>;
  grid$: Observable<IPerson[][][]>;
  assumptions: IAssumptions = starterAssumptions;

  constructor(
    private populationService: PopulationService
  ) { }

  ngOnInit(): void {
    this.population$ = this.populationService.population$;
    this.grid$ = this.populationService.grid$;
    this.populationService.initialize(this.assumptions);
  }

  location(x: number, y: number): ILocation {
    return { x, y };
  }
}
