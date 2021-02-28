import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alerts.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {
  alerts: {};

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.alertService.getAlerts().subscribe(
      data => this.alerts = data
    );
  }

}
