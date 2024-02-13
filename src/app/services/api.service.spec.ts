import { ApiService } from './api.service';
import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CacheService } from './cache.service';
import { of, throwError } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  let cacheService: CacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService, CacheService],
    });
    service = TestBed.inject(ApiService);
    cacheService = TestBed.inject(CacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  // here start
  it('should get user bio from cache', () => {
    const username = 'testUser';
    const mockData = { name: 'Test User', bio: 'Lorem ipsum' };

    spyOn(cacheService, 'get').and.returnValue(of(mockData));

    service.getUserBio(username).subscribe((data) => {
      expect(data).toEqual(mockData);
      expect(cacheService.get).toHaveBeenCalledWith(`GET /users/${username}`);
    });
  });

  // it(
  //   'should get user bio from Octokit and save to cache',
  //   waitForAsync(inject([ApiService], (apiService: ApiService) => {
  //     const username = 'testUser';
  //     const mockData = { name: 'Test User', bio: 'Lorem ipsum' };

  //     spyOn(cacheService, 'get').and.returnValue(of(undefined));
  //     spyOn(apiService['octokit'], 'request').and.returnValue(of(mockData));
  //     spyOn(cacheService, 'set');

  //     apiService.getUserBio(username).subscribe((data) => {
  //       expect(data).toEqual(mockData);
  //       expect(cacheService.get).toHaveBeenCalledWith(`GET /users/${username}`);
  //       expect(apiService['octokit'].request).toHaveBeenCalledWith(`GET /users/${username}`);
  //       expect(cacheService.set).toHaveBeenCalledWith(`GET /users/${username}`, mockData);
  //     });
  //   })
  // );

  // it('should handle error when getting user bio', () => {
  //   const username = 'testUser';
  //   const errorMessage = 'User bio failed';

  //   spyOn(cacheService, 'get').and.returnValue(of(undefined));
  //   spyOn(service['octokit'], 'request').and.returnValue(throwError(errorMessage));
  //   spyOn(console, 'error');

  //   service.getUserBio(username).subscribe(
  //     () => {},
  //     (error) => {
  //       expect(error).toEqual(errorMessage);
  //       expect(console.error).toHaveBeenCalledWith('Err:', errorMessage);
  //     }
  //   );
  // });

  // Similar tests for getUserRepos can be added
});
