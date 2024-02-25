import { Component, Input } from '@angular/core';
import { Movie } from '../../../models/movie.models';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [MatInputModule, MatCardModule, MatButtonModule, NgOptimizedImage],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  constructor(private router: Router) { }
  onMovieCardClick() {
    this.router.navigate([`/movie_details/${this.movie.uuid}`])
  }
  @Input() movie!: Movie;

}
