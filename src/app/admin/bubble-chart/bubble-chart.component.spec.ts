import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleChartComponent } from './bubble-chart.component';
import { RentStoreService } from '../../services/rent-store.service';
import { of } from 'rxjs';

describe('BubbleChartComponent', () => {
  let component: BubbleChartComponent;
  let fixture: ComponentFixture<BubbleChartComponent>;

  const rentStoreServiceSpy = jasmine.createSpyObj('RentStoreService', ['getMoviesForBubbleChart$']);
  rentStoreServiceSpy.getMoviesForBubbleChart$ = () => of([])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BubbleChartComponent],
      providers: [{ provide: RentStoreService, useValue: rentStoreServiceSpy }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BubbleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
