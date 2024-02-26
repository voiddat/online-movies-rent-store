import { Component, Input } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Movie } from '../models/movie.models';
import { RentStoreService } from '../services/rent-store.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MatCardModule, MatSnackBarModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent {
  constructor(private rentStoreService: RentStoreService, private snackBar: MatSnackBar) { }
  movie$!: Observable<Movie>;
  @Input()
  set uuid(movieUuid: string) {
    this.movie$ = this.rentStoreService.getMovie$(movieUuid);
  }

  onRentThisMovieClick(movieUuid: string) {
    this.rentStoreService.rentMovie$(movieUuid)
      .pipe(
    ).subscribe(
      {
        next: () => {
          this.snackBar.open('You rented this movie')
        },
        error: () => {
          this.snackBar.open('An error occured');
        }
      }
    );
  }
}
