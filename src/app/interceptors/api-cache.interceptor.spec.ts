import { TestBed } from '@angular/core/testing';

import { ApiCacheInterceptor } from './api-cache.interceptor';

describe('ApiCacheInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ApiCacheInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ApiCacheInterceptor = TestBed.inject(ApiCacheInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
