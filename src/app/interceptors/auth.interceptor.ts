import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isLoggedIn = this.loginService.isLoggedIn();
    if (isLoggedIn) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${this.loginService.getAccessToken()}` }
      });
    }
    return next.handle(req);
  }

}