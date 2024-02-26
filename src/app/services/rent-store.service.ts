import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Movie, MovieCategory, MoviesResponse, NewMovie } from '../models/movie.models';
import { ProfileResponse } from '../models/profile.models';
import { RentResponse, RentalsResponse } from '../models/rental.models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class RentStoreService {

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error())
  }

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  getMovies$(page: number, pageSize: number): Observable<MoviesResponse> {
    const params = new HttpParams()
      .append('page', page)
      .append('page_size', pageSize);

    return this.http.get<MoviesResponse>('/api/rent-store/movies/', { params });
  }

  getMovie$(movieUuid: string): Observable<Movie> {
    return this.http.get<Movie>(`/api/rent-store/movies/${movieUuid}`);
  }

  rentMovie$(movieUuid: string): Observable<RentResponse> {
    return this.http.post<RentResponse>('/api/rent-store/rentals/', { movie: movieUuid }).pipe(catchError(this.handleError));
  }

  getProfile$(): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>('/api/rent-store/profile/');
  }

  getRentals$(page: number, pageSize: number): Observable<RentalsResponse> {
    const params = new HttpParams()
      .append('page', page)
      .append('page_size', pageSize);

    return this.http.get<RentalsResponse>('/api/rent-store/rentals/', { params });
  }

  returnMovie$(rentalUuid: string): Observable<{}> {
    return this.http.patch(`/api/rent-store/rentals/${rentalUuid}`, {})
  }

  getCategories$(): Observable<MovieCategory[]> {
    return this.http.get<MovieCategory[]>('/api/rent-store/categories');
  }

  addMovie$(moviePayload: NewMovie): Observable<Movie> {
    return this.http.post<Movie>('/api/rent-store/movies/', { ...moviePayload })
  }

  getMoviesForBubbleChart$(fromYear: number, toYear: number, page: number, pageSize: number) {
    const params = new HttpParams()
      .append('page', page)
      .append('page_size', pageSize)
      .append('from-year', fromYear)
      .append('to-year', toYear)

    return this.http.get<MoviesResponse>('/api/rent-store/movies/', { params })
  }
}
