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
  PASSWORD_SESSION_ATTRIBUTE_NAME = 'authenticatedPassword'
  loginurl: string = 'http://localhost:8082/api/auth'
  public username: string = '';
  public password: string = '';

  constructor( private http: HttpClient, private handler: HttpBackend) { }

  authenticate(credentials: Credentials){

    const headers = new HttpHeaders(credentials ? {
      authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    this.http = new HttpClient(this.handler);

    return this.http.get(this.loginurl+'/signin', {headers: headers}).pipe(map((res) => {
      this.authenticated = true;
      this.username = credentials.username;
      this.password = credentials.password;
      this.registerSuccessfulLogin(credentials.username, credentials.password)
    }));
  }

  registerSuccessfulLogin(username: string, password: string) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
    sessionStorage.setItem(this.PASSWORD_SESSION_ATTRIBUTE_NAME, password)
    console.log(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(this.PASSWORD_SESSION_ATTRIBUTE_NAME);
    this.username = '';
    this.password = '';
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    console.log(user)
    return true
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }
  
  getLoggedInPassword() {
    let password = sessionStorage.getItem(this.PASSWORD_SESSION_ATTRIBUTE_NAME)
    if (password === null) return ''
    return password
  }
}
