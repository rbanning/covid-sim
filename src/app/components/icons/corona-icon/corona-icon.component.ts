import { Component, OnInit, HostBinding, Host, Input } from '@angular/core';

@Component({
  selector: 'app-corona-icon',
  templateUrl: './corona-icon.component.svg',
  styleUrls: ['./corona-icon.component.scss']
})
export class CoronaIconComponent implements OnInit {
  @Input()
  size = "32px";

  @HostBinding('style.width') width: string;
  @HostBinding('style.height') height: string;

  constructor() { }

  ngOnInit(): void {
    const size = this.parseSize();
    this.width = size;
    this.height = size;
  }

  private parseSize(): string {
    const size = parseInt(this.size, 10);
    
    return (size.toString() === this.size) ? `${this.size}px` : this.size;
  }
}
