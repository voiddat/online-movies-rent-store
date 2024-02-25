import { Injectable } from '@angular/core';
import { Movie } from "./../models/movie.models";

interface Dictionary<T> {
  [Key: string]: T;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  state: Dictionary<string> = {
    'access': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA4ODc0NTMxLCJqdGkiOiIyZWZmNzU2OWIxNTA0NWNkYTg0NTdhNmM3NDNiMTM3ZSIsInVzZXJfaWQiOjM1LCJpc19hZG1pbiI6ZmFsc2V9.wXQ4B2OoBGTSBsh7Ykor8yqff3nx89WTDnVaoM3W5kY'
  };
  constructor() { }

  public saveData(key: string, value: string) {
    this.state[key] = value;
  }

  public getData(key: string) {
    return this.state[key];

  }
  public removeData(key: string) {
    delete this.state[key];
  }
}
