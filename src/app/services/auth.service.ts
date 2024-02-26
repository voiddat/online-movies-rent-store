import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { LoginPayload, LoginResponse } from '../models/login.models';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAdmin$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private stateService: StateService) { }

  login$(payload: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/auth/login/', payload).pipe(
      tap(({ access, refresh }) => {
        const isAdmin = this.isAdmin(access)
        this.stateService.saveData('access', access);
        this.stateService.saveData('refresh', refresh);
        this.stateService.saveData('isAdmin', String(isAdmin));
        this.stateService.saveData('isLoggedIn', String(true));
        this.isLoggedIn$.next(true);
        this.isAdmin$.next(isAdmin);
      }),
    );
  }

  isAdmin(access: string): boolean {
    return (jwtDecode(access) as any)['is_admin'];
  }

  logout(): void {
    this.stateService.removeData('access');
    this.stateService.removeData('refresh');
    this.stateService.removeData('isAdmin');
    this.stateService.removeData('isLoggedIn');
    this.isLoggedIn$.next(false);
    this.isAdmin$.next(false);
  }

  isLoggedIn(): boolean {
    return Boolean(this.stateService.getData('isLoggedIn'));
  }

  getAccessToken(): string | null {
    return this.stateService.getData('access');
  }
}
