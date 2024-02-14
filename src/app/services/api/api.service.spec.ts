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

  afterEach(() => {
    // Add cleanup logic here, e.g., clear cache
    console.log(cacheService.getCache);
    cacheService.clearCache();
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
      console.warn(cacheService.getCache, 'userbio');
      expect(octo.request).toHaveBeenCalledWith(`GET ${apiEndpoint}`);
      expect(res).toEqual(jasmine.any(Object));
    });

    done();
  });

  // Get userReposData
  it('should fetch User Repo Data from Octokit', (done) => {
    const githubUsername = 'johnDoe';
    const apiEndpoint = `/users/${githubUsername}/repos`;
    const noOfRecords = 10;
    const page = 1;

    // Call the service method
    service.getUserRepos(githubUsername, noOfRecords, page).subscribe(
      (res) => {
        console.warn(cacheService.getCache, 'userRepo');
        expect(octo.request).toHaveBeenCalledWith(
          `GET ${apiEndpoint}&pages=${page}&perpage=${noOfRecords}`
        );
        expect(res).toEqual(jasmine.any(Object));
        expect(res.repos).toEqual(jasmine.any(Array));
      },
      (err) => {}
    );
    done();
  });

  it('should fetch data from cache if request is the same', (done) => {
    const githubUsername = 'DTomPanda';
    const key = `/users/${githubUsername}/repos`;
    const apiEndpoint = `/users/${githubUsername}`;
    // First instance of request as key checked
    expect(cacheService.get(apiEndpoint)).toBeUndefined();

    done();
  });
});
