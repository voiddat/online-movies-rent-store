import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsComponent } from './movie-details.component';
import { HttpClient } from '@angular/common/http';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;

  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetailsComponent],
      providers: [{provide: HttpClient, useValue: httpClientSpy}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
