import { Component, OnInit, Input } from '@angular/core';
import { IPerson } from '@app/common/person';
import { HealthService } from '@app/services';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  @Input()
  person: IPerson;

  ranges: any;
  isCollapsed: boolean = true;

  constructor(
    service: HealthService
  ) {
    this.ranges = service.ranges;
  }

  ngOnInit(): void {
  }

}
