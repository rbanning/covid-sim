import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { IRange } from '@app/common/range';

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class RangeComponent implements OnInit {
  @Input()
  range: IRange
  @Input()
  value: number;
  @Input()
  lowerLabel = "worst";
  @Input()
  lowerGradient = "rgba(62, 82, 100, 0.1)";
  @Input()
  upperLabel = "best";
  @Input()
  upperGradient = "rgba(62, 82, 100, 1)";
  @Input()
  color = "rgb(14, 65, 109)";
  @Input()
  width: number = 200;
  @Input()
  note: string = null;

  title: string;
  background: SafeStyle;
  translate: SafeStyle;

  constructor(
    private sanitization: DomSanitizer
  ) { }

  ngOnInit(): void {
    const percent = this.valueAsPercentOfMax();
    const location = Math.round(percent * this.width / 100);

    this.title = `${percent}%`;
    this.background = this.sanitization.bypassSecurityTrustStyle(
       `linear-gradient(0.25turn, ${this.lowerGradient}, ${this.upperGradient})`
    );
    this.translate = this.sanitization.bypassSecurityTrustStyle(
      `translate(${location}px, -2px)`
    );
    const { background, translate } = this;
    console.log("Range", {background, translate });
  }

  valueAsPercentOfMax() {
    if (!this.range || this.range.max === this.range.min) {
      console.warn("Range - cannot compute percent value - missing or invalid range", { range: this.range, value: this.value });
    }

    const delta = this.range.max - this.range.min;
    return Math.round((this.value - this.range.min) / delta * 100); //percent;
  }
}
