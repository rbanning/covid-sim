import { Component, OnInit, Input } from '@angular/core';
import { IHealthStatus } from 'src/app/common/health';

@Component({
  selector: 'app-health-status',
  templateUrl: './health-status.component.html',
  styleUrls: ['./health-status.component.scss']
})
export class HealthStatusComponent implements OnInit {
  @Input()
  status: IHealthStatus;

  constructor() { }

  ngOnInit(): void {
  }

}
