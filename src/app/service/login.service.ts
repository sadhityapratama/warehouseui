import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Credentials } from '../model/credential';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  authenticated = false;

  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public username: string = '';
  public password: string = '';

  constructor( private http: HttpClient, private handler: HttpBackend) { }

  loginurl: string = 'http://localhost:8082/user'

  authenticate(credentials: Credentials){

    const headers = new HttpHeaders(credentials ? {
      authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    this.http = new HttpClient(this.handler);

    return this.http.get(this.loginurl, {headers: headers}).pipe(map((res) => {
      this.authenticated = true;
      this.username = credentials.username;
      this.password = credentials.password;
      this.registerSuccessfulLogin(credentials.username, credentials.password)
    }));
    

  }

  registerSuccessfulLogin(username: string, password: string) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
    console.log(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username = '';
    this.password = '';
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }
}
