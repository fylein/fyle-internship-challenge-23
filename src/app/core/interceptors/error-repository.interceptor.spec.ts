import { TestBed } from '@angular/core/testing';

import { ErrorRepositoryInterceptor } from './error-repository.interceptor';

describe('ErrorRepositoryInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ErrorRepositoryInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ErrorRepositoryInterceptor = TestBed.inject(ErrorRepositoryInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
