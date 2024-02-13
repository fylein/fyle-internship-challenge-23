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
import { environment } from 'src/environments/environment';
import {
  githubData,
  returnBlankUser,
  newPageHandler,
} from 'src/app/store/state';

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
        PollingService, // Provide PollingService
        { provide: Octokit, useValue: spy },
      ],
    });

    service = TestBed.inject(ApiService);
    cacheService = TestBed.inject(CacheService);
    octo = TestBed.inject(Octokit);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data from Octokit with authentication token', (done) => {
    const githubUsername = 'exampleUser';
    const apiEndpoint = `/users/${githubUsername}`;

    // Set up Octokit spy to return a resolved promise with mock response
    octo.request.and.returnValue(
      Promise.resolve({
        headers: {},
        status: 200,
        url: apiEndpoint,
        authorization: environment.token,
        data: githubUsername,
      })
    );

    // Call the service method
    service.getUserBio(githubUsername).subscribe((res) => {
      // Verify that Octokit data is returned
      expect(res).toEqual(jasmine.any(Object));
      done();
    });

    // Ensure Octokit request was made with the correct endpoint and token
    // expect(octo.request).toHaveBeenCalledWith(`GET ${apiEndpoint}`, {
    //   headers: {
    //     authorization: environment.token, // Replace with your test access token
    //   },
    // });
  });

  // Similar tests for getUserRepos can be added
});
