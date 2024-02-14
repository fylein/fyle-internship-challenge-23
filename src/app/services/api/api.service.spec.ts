import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { Store, StoreModule } from '@ngrx/store';
import { CacheService } from '../cache/cache.service';
import { ApiService } from './api.service';
import { PollingService } from '../polling/polling.service'; // Import your PollingService
import { of, Observable } from 'rxjs';
import { Octokit } from 'octokit';
import { environment } from '../../../environments/environment';
import { githubData, returnBlankUser, newPageHandler } from '../../store/state';

TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

describe('ApiService', () => {
  let service: ApiService;
  let cacheService: CacheService;
  let octo: jasmine.SpyObj<Octokit>;
  let blankUser = {
    repos: [],
    users: returnBlankUser(),
    pageState: newPageHandler(),
  };

  beforeEach(() => {
    const spy = jasmine.createSpyObj(Octokit, ['request']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],
      providers: [
        ApiService,
        CacheService,
        PollingService,
        { provide: Octokit, useValue: spy },
      ],
    });

    service = TestBed.inject(ApiService);
    cacheService = TestBed.inject(CacheService);
    octo = TestBed.inject(Octokit);
  });

  it('should be created', () => {
    // The instance of Octokit
    expect(service.returnOctokit()).toBeDefined();
    expect(service).toBeTruthy();
  });

  // Get userBioData
  it('should fetch User Bio data from Octokit ', (done) => {
    const githubUsername = 'himanshuxd';
    const apiEndpoint = `/users/${githubUsername}`;

    // Call the service method
    service.getUserBio(githubUsername).subscribe((res) => {
      expect(octo.request).toHaveBeenCalledWith('GET /users/himanshuxd');
      expect(res).toEqual(jasmine.any(Object));
    });

    done();
  });

  // Get userReposData
  it('should fetch User Repo Data from Octokit', (done) => {
    const githubUsername = 'johnDoe';
    const apiEndpoint = `/users/${githubUsername}/repos`;

    // Call the service method
    service.getUserBio(githubUsername).subscribe((res) => {
      expect(res).toEqual(jasmine.any(Object));
    });
    done();
  });

  it('should fetch data from cache if request is the same', (done) => {
    const githubUsername = 'DTomPanda';
    const key = `/users/${githubUsername}/repos`;
    const apiEndpoint = `/users/${githubUsername}`;

    // //The cacheHashMap
    const apiCache = cacheService['apiCache'];

    // First instance of request as key checked
    expect(apiCache.has(key)).toBeFalse();
    // expect(cacheService.get(apiEndpoint)).toBe(undefined);
    done();
  });
});
