import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie, MoviesResponse } from '../models/movie.models';
import { RentStoreService } from '../services/rent-store.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MovieCardComponent } from './components/movie-card/movie-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,MovieCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor(private rentStoreService: RentStoreService) {}
  movies$!: Observable<MoviesResponse>;
  ngOnInit(): void {
    this.movies$ = this.rentStoreService.getMovies$(2, 25);
  }

}
