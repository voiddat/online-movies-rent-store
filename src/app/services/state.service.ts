import { Injectable } from '@angular/core';
import { Movie } from "./../models/movie.models";

interface Dictionary<T> {
  [Key: string]: T;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  constructor() { }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value)
  }

  public getData(key: string) {
    return localStorage.getItem(key);

  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }
}
