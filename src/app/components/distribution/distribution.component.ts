import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { IDistribution } from 'src/app/common/distribution';

@Component({
  selector: 'app-distribution',
  templateUrl: './distribution.component.html',
  styleUrls: ['./distribution.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DistributionComponent implements OnInit {
  @Input()
  distribution: IDistribution;

  @Input()
  label: string;

  constructor() { }

  ngOnInit(): void {
  }

}
