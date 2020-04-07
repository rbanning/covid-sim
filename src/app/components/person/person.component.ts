import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { IPerson } from '@app/common/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonComponent implements OnInit {
  @Input()
  person: IPerson;

  isCollapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

}
