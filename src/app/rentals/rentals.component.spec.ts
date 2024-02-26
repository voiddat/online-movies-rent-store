import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalsComponent } from './rentals.component';
import { RentStoreService } from '../services/rent-store.service';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RentalsComponent', () => {
  let component: RentalsComponent;
  let fixture: ComponentFixture<RentalsComponent>;

  const rentStoreServiceSpy = jasmine.createSpyObj('RentStoreService', ['getRentals$']);
  rentStoreServiceSpy.getRentals$ = () => of([])
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalsComponent, NoopAnimationsModule],
      providers: [{ provide: RentStoreService, useValue: rentStoreServiceSpy }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
