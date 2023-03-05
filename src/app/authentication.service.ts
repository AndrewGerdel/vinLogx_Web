import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  errorMsg = "";
  loginSubject = new Subject<Object>();

  
  constructor(private httpClient: HttpClient) { }

  
  login(username: string, password: string) {
    this.httpClient.post(environment.apiUrl + '/login', { username, password })
      .subscribe(
        data => {
          localStorage.setItem("username", username);
          this.loginSubject.next(data);
        },
        err => {
          this.errorMsg = "Login failed."
          this.loginSubject.next("");
        }
      );
  }

  logout() {
    localStorage.setItem("authToken", "");
    localStorage.setItem("adminToken", "");
    localStorage.setItem("username", "");
    this.errorMsg = "You have been logged out"
    this.loginSubject.next("");
  }

  isAuthenticated(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

}
