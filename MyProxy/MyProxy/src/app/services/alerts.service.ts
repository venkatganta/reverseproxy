import { HttpErrorResponse } from "@angular/common/http";
import { Injectable, EventEmitter } from "@angular/core";
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
import { throwError } from "rxjs";
import { environment } from "../environments/environment";
import { NotificationModel } from "../models/notification";

@Injectable({ providedIn: 'root' })
export class AlertService {
  private _hubConnection: HubConnection;
  signalReceived = new EventEmitter<NotificationModel>();

  constructor() {
    this.buildConnection();
    this.startConnection();
  }

  public buildConnection = () => {
    this._hubConnection = new HubConnectionBuilder().withUrl(`${environment.apiUrl}/notify`).build();
  }

  public startConnection = () => {
    this._hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        this.registerSignalEvents();
      })
      .catch(err => this.handleError(err))
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  public registerSignalEvents = () => {
    this._hubConnection.on('ReceiveMessage', (data) => {
      this.signalReceived.emit(data);
      console.log(data);
    });
  }

}
