import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { Store, StoreModule } from '@ngrx/store';
import { CacheService } from '../cache/cache.service';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { throwError } from 'rxjs';
import { Octokit } from 'octokit';

TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

let mockCacheService: jasmine.SpyObj<CacheService> = jasmine.createSpyObj(
  'CacheService',
  ['get', 'set', 'clearCache', 'getCache']
);

describe('ApiService', () => {
  let service: ApiService;
  let cacheService: CacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],
      providers: [
        ApiService,
        { provide: CacheService, useValue: mockCacheService },
        CacheService,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    service = TestBed.inject(ApiService);
    cacheService = TestBed.inject(CacheService);
  });

  afterEach(() => {
    mockCacheService.clearCache();
  });

  it('should be created', () => {
    // The instance of Octokit
    expect(service.returnOctokit()).toBeDefined();
    expect(service).toBeTruthy();
  });

  // Get userBioData
  it('should fetch User Bio data from Octokit ', (done) => {
    const githubUsername = 'himanshuxd';
    const api = `GET /users/${githubUsername}`;
    // Call the service method

    let result = cacheService.get(api);
    if (result) {
      expect(result).toEqual(jasmine.any(Observable));
    } else {
      expect(result).toBeUndefined();
    }

    service.getUserBio(githubUsername).subscribe((res) => {
      expect(res).toEqual(jasmine.any(Object));
      expect(res.status).toEqual(200);

      done();
    });
  });

  // Get userReposData
  it('should fetch User Repo Data from Octokit', (done) => {
    const githubUserName = 'Linus';
    const noOfRepos = 10;
    const page = 1;
    const api = `GET /users/${githubUserName}/repos?per_page=${noOfRepos}&pages=${page}`;

    let result = cacheService.get(api);
    if (result) {
      expect(result).toEqual(jasmine.any(Observable));
    } else {
      expect(result).toBeUndefined();
    }

    // Call the service method
    service.getUserRepos(githubUserName, noOfRepos, page).subscribe((res) => {
      expect(res).toEqual(jasmine.any(Object));
      expect(res.data).toEqual(jasmine.any(Array));
      expect(res.status).toEqual(200);
      done();
    });
  });

  // Caching
  it('should fetch User Repo Data from Cache', (done) => {
    const githubUserName = 'Linus';
    const noOfRepos = 10;
    const page = 1;
    const api = `GET /users/${githubUserName}/repos?per_page=${noOfRepos}&pages=${page}`;

    cacheService.set(api, 'SOme Bio Data goes here');

    // Call the service method
    service.getUserRepos(githubUserName, noOfRepos, page).subscribe((res) => {
      let result = cacheService.get(api);
      if (result) {
        expect(of(result)).toEqual(jasmine.any(Observable));
      } else {
        expect(result).toBeUndefined();
      }
      expect(of(res)).toEqual(jasmine.any(Object));

      done();
    });
  });

  it('should fetch User Repo Data from Cache', (done) => {
    const githubUserName = 'Linus';
    const api = `GET /users/${githubUserName}`;

    cacheService.set(api, 'Some User Data goes here');

    // Call the service method
    service.getUserBio(githubUserName).subscribe((res) => {
      let result = cacheService.get(api);
      if (result) {
        expect(of(result)).toEqual(jasmine.any(Observable));
      } else {
        expect(result).toBeUndefined();
      }
      expect(of(res)).toEqual(jasmine.any(Object));

      done();
    });
  });

  // FAILS
  it('should handle error for invalid GitHub username(Bio)', (done) => {
    const githubUsername = '00?';
    const cacheKey = `GET /users/${githubUsername}`;

    // Spy on octokit.request to simulate an error
    spyOn(service['octokit'], 'request').and.returnValue(Promise.reject());

    service.getUserBio(githubUsername).subscribe(
      () => {
        fail('getUserBio should have thrown an error');
      },
      (error) => {
        expect(error).toEqual('User bio failed');

        expect(cacheService.get(cacheKey)).toBeUndefined();
        done();
      }
    );
  });

  it('should handle error for invalid GitHub username(Repos))', (done) => {
    const githubUserName = '00?';
    const noOfRepos = 10;
    const page = 1;
    const cacheKey = `GET /users/${githubUserName}/repos?per_page=${noOfRepos}&pages=${page}`;

    // Spy on octokit.request to simulate an error
    spyOn(service['octokit'], 'request').and.returnValue(Promise.reject());

    service.getUserRepos(githubUserName, noOfRepos, page).subscribe(
      () => {
        fail('getUserBio should have thrown an error');
      },
      (error) => {
        expect(error).toEqual('User RepoData request failed');

        expect(cacheService.get(cacheKey)).toBeUndefined();
        done();
      }
    );
  });
});
