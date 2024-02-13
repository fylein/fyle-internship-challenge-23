import { TestBed } from '@angular/core/testing';

import { CacheServiceService } from './cache-service.service';

describe('CacheServiceService', () => {
  let service: CacheServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
