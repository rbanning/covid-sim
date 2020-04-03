import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';

import { PopulationService } from 'src/app/services';
import { IPerson } from 'src/app/common/person';
import { IAssumptions, starterAssumptions } from 'src/app/common/assumptions';
import { ILocation } from '@app/common/location';
import { GroupTemplateComponent } from '@app/templates/group-template/group-template.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  population$: Observable<IPerson[]>;
  grid$: Observable<IPerson[][][]>;
  assumptions: IAssumptions = starterAssumptions;
  selected: ILocation = null;

  constructor(
    private populationService: PopulationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.population$ = this.populationService.population$;
    this.grid$ = this.populationService.grid$;
    this.populationService.initialize(this.assumptions);
  }

  location(x: number, y: number): ILocation {
    return { x, y };
  }

  isSelected(x: number, y: number): boolean {
    return this.selected && this.selected.x === x && this.selected.y === y;
  }

  view(location: ILocation, people: IPerson[]) {
    this.selected = location;
    const dialogRef = this.dialog.open(GroupTemplateComponent, {
      width: '600px',
      data: {location, people}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selected = null;
    });
    console.log("view", {location, people});
  }
}
