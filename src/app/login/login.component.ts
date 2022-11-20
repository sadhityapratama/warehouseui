import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from '../model/credential';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = new Credentials('','')

  errorMessage = 'Invalid Credentials';
  successMessage!: string;
  invalidLogin = false;
  loginSuccess = false;
  constructor(
    private loginService: LoginService
    , private http: HttpClient
    , private router: Router
  ){
    
  }

  login(){
    this.loginService.authenticate(this.credentials).subscribe((result) => {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      this.router.navigate(['/dashboard'])
    }, () => {
      this.router.navigate([''])
      this.invalidLogin = true;
      this.loginSuccess = false;
    });
    return false;
  }
}
