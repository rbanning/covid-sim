import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  @Output()
  menuToggle = new EventEmitter();

  appTitle = "Application Title";

  constructor() { }

  ngOnInit(): void {
  }

  handleMenuToggle() {
    this.menuToggle.emit();
  }
}
