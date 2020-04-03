import { Component, OnInit, Input } from '@angular/core';
import { IHealth } from 'src/app/common/health';
import { HealthService } from '@app/services';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.scss']
})
export class HealthComponent implements OnInit {
  @Input()
  health: IHealth

  ranges: any;

  constructor(
    service: HealthService
  ) {
    this.ranges = service.ranges;
   }

  ngOnInit(): void {
  }

}
