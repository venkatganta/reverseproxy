import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { User } from '../models/user';


@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(private http: HttpClient) {

  }
  getCountries() {
    return this.http.get(`${environment.apiUrl}/api/account`).pipe(
      catchError(this.handleError)
    );
  }
  login(username, password, countryId) {
    let loginModel = {
      "UserName": username, "Password": password, "CountryId": parseInt(countryId)
    };
    console.log(JSON.stringify(loginModel));
    return this.http.post<User>(`${environment.apiUrl}/api/account`, loginModel)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}
