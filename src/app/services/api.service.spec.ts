import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a user from GitHub', () => {
    const githubUsername = 'johndoe';
    const userData = {
      login: 'sampleuser',
      name: 'Sample User',
    };

    service.getUser(githubUsername).subscribe((response) => {
      expect(response).toEqual(userData);
    });

    const req = httpTestingController.expectOne(`https://api.github.com/users/${githubUsername}`);
    expect(req.request.method).toBe('GET');
    req.flush(userData);
  });

  it('should get a list of repositories from GitHub', () => {
    const reposUrl = 'https://api.github.com/users/johndoe/repos';
    const repoList = [
      { name: 'repo1' },
      { name: 'repo2' },
    ];

    service.getRepos(reposUrl).subscribe((response) => {
      expect(response).toEqual(repoList);
    });

    const req = httpTestingController.expectOne(reposUrl);
    expect(req.request.method).toBe('GET');
    req.flush(repoList);
  });

  it('should get the languages of a GitHub repository', () => {
    const username = 'sampleuser';
    const repoName = 'repo1';
    const languagesData = {
      JavaScript: 1000,
      TypeScript: 500,
    };

    service.getRepoLanguages(username, repoName).subscribe((response) => {
      expect(response).toEqual(languagesData);
    });

    const req = httpTestingController.expectOne(
      `https://api.github.com/repos/${username}/${repoName}/languages`
    );
    expect(req.request.method).toBe('GET');
    req.flush(languagesData);
  });
});
