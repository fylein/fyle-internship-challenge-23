import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GithubService } from './github.service';
import { User } from '../Model/user';
import { Repo } from '../Model/repo';

describe('GithubService', () => {
  let service: GithubService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService]
    });

    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user data', () => {
    const mockUser: User = {
        id: 123,
        login: 'mockuser',
        name: 'Mock User',
        img_url: 'https://example.com/avatar.png',
        bio: 'hello world',
        followers: 11,
        following: 1,
        public_repos: 12,
        twitter_username: 'atmalviya',
        blog: 'you cant miss out'
      
      
    };

    service.getUser('username').subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne('https://api.github.com/users/username');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should fetch user repos', () => {
    const mockRepos: Repo[] = [
      {
        id: 1,
        name: 'mock-repo-1',
        description: 'This is a mock repository',
        html_url: 'https://github.com/user/mock-repo-1',
        topics: ['topic1', 'topic2']
      },
      {
        id: 2,
        name: 'mock-repo-2',
        description: 'Another mock repository',
        html_url: 'https://github.com/user/mock-repo-2',
        topics: ['topic3', 'topic4']
      },
    ];

    service.getUserRepos('username').subscribe(repos => {
      expect(repos).toEqual(mockRepos);
    });

    const req = httpMock.expectOne('https://api.github.com/users/username/repos?page=1&per_page=10');
    expect(req.request.method).toBe('GET');
    req.flush(mockRepos);
  });

  it('should handle errors properly', () => {
    const errorMessage = 'Error message';
    const status = 404;
  
    service.getUser('nonexistentuser').subscribe(
      () => {},
      (error) => {
        expect(error).toBeTruthy();
        expect(error).toBe(`Error: ${status}`);
      }
    );
  
    const req = httpMock.expectOne('https://api.github.com/users/nonexistentuser');
    expect(req.request.method).toBe('GET');
    req.flush(errorMessage, { status, statusText: 'Not Found' });
  });
  
  
});
