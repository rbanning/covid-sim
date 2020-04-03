import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-collapsible-icon',
  templateUrl: './collapsible-icon.component.html',
  styleUrls: ['./collapsible-icon.component.scss']
})
export class CollapsibleIconComponent implements OnInit {
  @Input()
  isCollapsed: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
