import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IColorRgba, ColorRgba } from 'src/app/common/color';

@Component({
  selector: 'app-ball',
  templateUrl: './ball.component.svg',
  styleUrls: ['./ball.component.scss']
})
export class BallComponent implements OnInit, OnChanges {
  @Input()
  color = '#ff0000';

  fill: IColorRgba = new ColorRgba();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes) {
    if (changes.color) {
      this.parseColor(this.color);
    }
  }

  changeColor() {
    const alpha = this.fill.alpha - 0.1;
    this.fill.alpha = (alpha > 0.01) ? alpha : 1;
  }

  private parseColor(color: string) {
    this.fill = new ColorRgba(color);
  }
}
