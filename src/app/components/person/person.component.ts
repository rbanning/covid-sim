import { Component, OnInit, Input } from '@angular/core';
import { IPerson } from '@app/common/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  @Input()
  person: IPerson;

  isCollapsed: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
