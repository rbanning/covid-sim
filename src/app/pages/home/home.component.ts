import { Component, OnInit } from '@angular/core';
import { PopulationService } from 'src/app/services';
import { Observable } from 'rxjs';
import { IPerson } from 'src/app/common/person';
import { IAssumptions, starterAssumptions } from 'src/app/common/assumptions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  population$: Observable<IPerson[]>;
  assumptions: IAssumptions = starterAssumptions;

  constructor(
    private populationService: PopulationService
  ) { }

  ngOnInit(): void {
    this.population$ = this.populationService.population$;
    this.populationService.initialize(this.assumptions);
  }

}
