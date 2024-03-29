import { TestBed } from '@angular/core/testing';

import { RentStoreService } from './rent-store.service';
import { HttpClient } from '@angular/common/http';

describe('RentStoreService', () => {
  let service: RentStoreService;

  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [{ provide: HttpClient, useValue: httpClientSpy }] });
    service = TestBed.inject(RentStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
