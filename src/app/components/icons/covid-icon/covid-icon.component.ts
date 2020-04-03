import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-covid-icon',
  templateUrl: './covid-icon.component.svg',
  styleUrls: ['./covid-icon.component.scss']
})
export class CovidIconComponent implements OnInit {
  private readonly DEFAULT_SIZE: string = "38px";
  @Input()
  size: string = this.DEFAULT_SIZE;

  @HostBinding("style.width") width: string;
  @HostBinding("style.height") height: string;

  constructor() { }

  ngOnInit(): void {
    const size = this.parseSize(this.size);
    this.width = size;
    this.height = size;
  }

  private parseSize(value: string): string {
    const size = parseInt(value);
    if (isNaN(size)) {
      console.warn("CovidIconCompenent - invalid size", {size: this.size});
      return this.parseSize(this.DEFAULT_SIZE);
    } else if (size.toString() === value.toString()) {
      return `${size}px`;
    }
    //else
    return value;
  }
}
