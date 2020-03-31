import { Component, OnInit, Input } from '@angular/core';
import { IHealth } from 'src/app/common/health';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.scss']
})
export class HealthComponent implements OnInit {
  @Input()
  health: IHealth

  constructor() { }

  ngOnInit(): void {
  }

}
