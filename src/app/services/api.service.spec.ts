import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user detail for valid user', () => {
    let httpMock = TestBed.inject(HttpTestingController);
    const githubUsername = 'jayshil-n-b';
    const expectedData = {
      avatar_url: 'Jayshil-n-b',
      bio: '🟢 Postman Student Expert',
      login: 'Jayshil-n-b',
      name: 'Jayshil N. Buddhadev',
      twitter_username: null,
    };
    service.getUser(githubUsername).subscribe((data) => {
      expect(data).toEqual(expectedData);
    });
    const req = httpMock.expectOne(
      'https://api.github.com/users/' + githubUsername
    );
    expect(req.request.method).toEqual('GET');
  });

  it('should get repo detail for valid user', () => {
    const githubUsername = 'jayshil-n-b';
    const expectedRepoData = [
      { id: 627030302, name: '2-phase-commit-simulation' },
    ];
    service.getRepos(githubUsername, 1, 1).subscribe((data) => {
      expect(data).toEqual(expectedRepoData);
    });
  });

  it('should return null when passed invalid user', () => {
    const githubUsername = '123879wreuh';
    service.getRepos(githubUsername, 1, 1).subscribe(
      (data) => {},
      (error) => {
        expect(error).toBeTruthy();
      }
    );
  });

  it('should return null when passed invalid users repo', () => {
    const githubUsername = '123879wreuh';
    service.getRepos(githubUsername, 1, 1).subscribe(
      (data) => {},
      (error) => {
        expect(error).toBeTruthy();
      }
    );
  });
});
