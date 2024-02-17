import { TestBed } from '@angular/core/testing';

import { CacheService } from './cache.service';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get cache', () => {
    spyOn(service, 'get').and.callThrough();

    const cacheKey = 'someKey';
    const result = service.get(cacheKey);

    // Assert
    expect(service.get).toHaveBeenCalledOnceWith(cacheKey);
    expect(result).toBeUndefined();
  });

  it('should set cache', () => {
    spyOn(service, 'set').and.callThrough();

    const cacheKey = 'someKey';
    const value = 'someValue';
    service.set(cacheKey, value);

    // Assert
    expect(service.set).toHaveBeenCalledOnceWith(cacheKey, value);
  });

  it('should return the whole cache', () => {
    spyOn(service, 'getCache').and.callThrough();
    const result = service.getCache();

    expect(service.getCache).toHaveBeenCalledOnceWith();
    expect(result instanceof Map).toBe(true);
  });
});
