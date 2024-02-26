import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { ProfileResponse } from '../models/profile.models';
import { RentStoreService } from '../services/rent-store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  constructor(private rentStoreService: RentStoreService) { }
  profile$!: Observable<ProfileResponse>;
  ngOnInit(): void {
    this.profile$ = this.rentStoreService.getProfile$();
  }

}
