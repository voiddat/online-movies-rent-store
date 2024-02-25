import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginPayload, LoginResponse } from '../models/login.models';
import { HttpClient } from '@angular/common/http';
import { API_ROOT } from '../api.const';
import { Locals } from 'express';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private stateService: StateService) { }

  login$(payload: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/auth/login/', payload).pipe(
      tap(({ access, refresh }) => {
        this.stateService.saveData('access', access);
        this.stateService.saveData('refresh', refresh);
      })
    );
  }

  isLoggedIn(): boolean {
    return !!this.stateService.getData('access');
  }

  getAccessToken(): string | null {
    return this.stateService.getData('access');
  }
}
