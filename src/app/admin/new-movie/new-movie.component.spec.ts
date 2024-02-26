import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMovieComponent } from './new-movie.component';
import { RentStoreService } from '../../services/rent-store.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NewMovieComponent', () => {
  let component: NewMovieComponent;
  let fixture: ComponentFixture<NewMovieComponent>;
  const rentStoreServiceSpy = jasmine.createSpyObj('RentStoreService', ['getCategories$']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMovieComponent, BrowserAnimationsModule],
      providers: [{ provide: RentStoreService, useValue: rentStoreServiceSpy }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
