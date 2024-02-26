import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RentStoreService } from '../../services/rent-store.service';
import { Observable } from 'rxjs';
import { MovieCategory, NewMovie } from '../../models/movie.models';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-new-movie',
  standalone: true,
  imports: [MatInputModule, MatCardModule, MatButtonModule, CommonModule, FormsModule, MatSelectModule, MatSnackBarModule],
  templateUrl: './new-movie.component.html',
  styleUrl: './new-movie.component.scss'
})
export class NewMovieComponent implements OnInit {
  categories$!: Observable<MovieCategory[]>;
  constructor(private rentStoreService: RentStoreService, private matSnackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.categories$ = this.rentStoreService.getCategories$()
  }
  model: Partial<NewMovie> = {};

  onSubmit(): void {
    this.rentStoreService.addMovie$(this.model as NewMovie).subscribe(() => this.matSnackBar.open('Movie added succesfully!'), () => this.matSnackBar.open('An error occured'));
  }
}
