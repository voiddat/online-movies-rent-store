import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { HttpClient } from '@angular/common/http';
import { RentStoreService } from '../services/rent-store.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  const rentStoreServiceSpy = jasmine.createSpyObj('RentStoreService', ['getProfile$']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [{provide: RentStoreService, useValue: rentStoreServiceSpy}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
