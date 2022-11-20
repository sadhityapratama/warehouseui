import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse, HttpEventType  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginService } from './service/login.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor(private loginService: LoginService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.loginService.isUserLoggedIn() && req.url.indexOf('basicauth') === -1) {
            const authReq = req.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${window.btoa(this.loginService.getLoggedInUserName() + ":" + this.loginService.getLoggedInPassword())}`
                })
            });
            return next.handle(authReq).pipe(catchError((error) => {
                console.log('error is intercept')
                console.error(error)
                return  throwError(error.error)
            }));
        } else {
            return next.handle(req);
        }
    }
}