import { Component, OnInit } from '@angular/core';
import { NotificationModel } from '../models/notification';
import { AlertService } from '../services/alerts.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {
  signalList: NotificationModel[] = [];

  constructor(
    private alertService: AlertService
  ) { }


  ngOnInit() {
    this.alertService.signalReceived.subscribe((signal: NotificationModel) => {
     // console.log(signal);
      this.signalList.push(signal);
    });
  }
}
