import { TestBed } from '@angular/core/testing';

import { CacheInterceptor } from './cache-interceptor.interceptor';
import { CacheService } from 'src/app/services/cache-services/cache-service.service';

describe('CacheInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CacheInterceptor,
      CacheService
      ]
  }));

  it('should be created', () => {
    const interceptor: CacheInterceptor = TestBed.inject(CacheInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
