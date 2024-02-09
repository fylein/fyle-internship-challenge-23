import { TestBed } from '@angular/core/testing';
import { CacheService } from './cache-service.service';

describe('CacheServiceService', () => {
  let service: CacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CacheService],
    });
    service = TestBed.inject(CacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
