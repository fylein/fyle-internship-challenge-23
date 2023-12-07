import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService, GitHubUser, GitHubRepository } from './api.service';

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

  it('should get user data', () => {
    const username = 'lklivingstone';
    const mockUser: GitHubUser = {
      name: 'L K Livingstone',
      bio: 'Learning Rust, oof... ',
      location: 'India',
      twitter_username: 'unclelkk',
      html_url: 'https://github.com/lklivingstone',
      avatar_url: 'https://avatars.githubusercontent.com/u/74340009?v=4',
      public_repos: 37,
    };

    service.getUser(username).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpTestingController.expectOne(`https://api.github.com/users/${username}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockUser);
  });

  it('should get repositories', () => {
    const username = 'testUser';
    const currentPage = 1;
    const reposPerPage = 10;
    const mockRepos: GitHubRepository[] = [
      { id: 1, name: 'Repo1', description: 'Description1', topics: ['Topic1'], url: 'Repo1Url' },
    ];

    service.getRepos(username, currentPage, reposPerPage).subscribe((repos) => {
      expect(repos).toEqual(mockRepos);
    });

    const req = httpTestingController.expectOne(
      `https://api.github.com/users/${username}/repos?page=${currentPage}&per_page=${reposPerPage}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockRepos);
  });

  it('should set user data', () => {
    const mockUser: GitHubUser = {
      name: 'John Doe',
      bio: 'Some bio',
      location: 'Some location',
      twitter_username: 'twitterHandle',
      html_url: 'https://github.com/johndoe',
      avatar_url: 'https://github.com/johndoe/avatar',
      public_repos: 10,
    };

    service.setUserData(mockUser);

    service.getUserData().subscribe((user) => {
      expect(user).toEqual(mockUser);
    });
  });

  it('should get repositories count', () => {
    const reposCount = 5;
    const mockUser: GitHubUser = {
      name: 'John Doe',
      bio: 'Some bio',
      location: 'Some location',
      twitter_username: 'twitterHandle',
      html_url: 'https://github.com/johndoe',
      avatar_url: 'https://github.com/johndoe/avatar',
      public_repos: reposCount,
    };
  
    service.getUserData().subscribe(() => {
      service.getReposCount().subscribe((count) => {
        expect(count).toEqual(reposCount);
      });
    });
  
    service.setUserData(mockUser);
  });
});
