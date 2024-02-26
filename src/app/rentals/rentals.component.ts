import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Observable, catchError, of } from 'rxjs';
import { Rental, RentalsResponse } from '../models/rental.models';
import { RentStoreService } from '../services/rent-store.service';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-rentals',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSnackBarModule, MatPaginatorModule, MatSortModule],
  templateUrl: './rentals.component.html',
  styleUrl: './rentals.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class RentalsComponent implements OnInit {
  sortData(sort: Sort) {
    const data = this.sortedData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'rental_date':
          return compare(a.rental_date, b.rental_date, isAsc);
        case 'is_paid':
          return compare(String(a.is_paid), String(b.is_paid), isAsc);
        case 'movie':
          return compare(a.movie, b.movie, isAsc);
        default:
          return 0;
      }
    });
  }

  sortedData!: Rental[];

  onPageChange($event: PageEvent) {
    console.log($event);
    this.page = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.ngOnInit();
  }
  constructor(private rentStoreService: RentStoreService, private snackBar: MatSnackBar) { }

  displayedColumns = ['rental_date', 'return_date', 'is_paid', 'user', 'movie', 'return_movie'];
  pageSize = 25;
  page = 0;
  rentals$!: Observable<RentalsResponse>;

  ngOnInit(): void {
    this.rentals$ = this.rentStoreService.getRentals$(this.page + 1, this.pageSize);
    this.rentals$.subscribe((rentalsResponse) => this.sortedData = rentalsResponse.results)
  }

  onReturnMovieClick(rentalUuid: string) {
    this.rentStoreService.returnMovie$(rentalUuid).pipe(
    ).subscribe({
      next: () => {
        this.snackBar.open('The movie has been returned');
        this.ngOnInit()
      }, error: () => {
        this.snackBar.open('An error occured');
      }
    })

  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}