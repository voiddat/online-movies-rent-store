import { Injectable } from '@angular/core';
import { Movie, MoviesResponse } from '../models/movie.models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentStoreService {

  constructor(private http: HttpClient) { }

  getMovies$(page: number, pageSize: number): Observable<MoviesResponse> {
    const params = new HttpParams()
    .append('page', page)
    .append('page_size', pageSize);

    return this.http.get<MoviesResponse>('/api/rent-store/movies/', { params });
  }
}
