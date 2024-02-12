import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { of } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ApiService, { provide: HttpClient, useValue: httpSpy }],
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user repositories', () => {
    const username = 'sid120';
    const page = 1;
    const itemsPerPage = 10;
    const mockResponse = [{ name: 'repo1' }, { name: 'repo2' }];

    httpSpy.get.and.returnValue(of(mockResponse));

    service.getUserRepositories(username, page, itemsPerPage).subscribe((repos) => {
      expect(repos).toEqual(mockResponse);
    });

    expect(httpSpy.get).toHaveBeenCalledWith(`https://api.github.com/users/${username}/repos`, {
      params: { page: '1', per_page: '10' },
    });
  });

  it('should get repo details', () => {
    const owner = 'sid120';
    const repo = 'repo1';
    const mockResponse = { name: 'repo1', description: 'Repository description' };

    httpSpy.get.and.returnValue(of(mockResponse));

    service.getRepoDetails(owner, repo).subscribe((repoDetails) => {
      expect(repoDetails).toEqual(mockResponse);
    });

    expect(httpSpy.get).toHaveBeenCalledWith(`https://api.github.com/repos/${owner}/${repo}`);
  });

});
