import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginService: AuthService, private router: Router) { }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      this.router.navigateByUrl(`/login`);
      return of(err.message); // or EMPTY may be appropriate here
    }
    return throwError(err);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isLoggedIn = this.loginService.isLoggedIn();
    if (isLoggedIn) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${this.loginService.getAccessToken()}` }
      });
    }
    return next.handle(req).pipe(catchError(err => this.handleAuthError(err)));
  }

}