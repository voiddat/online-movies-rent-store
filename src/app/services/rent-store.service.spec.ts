import { TestBed } from '@angular/core/testing';

import { RentStoreService } from './rent-store.service';

describe('RentStoreService', () => {
  let service: RentStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
