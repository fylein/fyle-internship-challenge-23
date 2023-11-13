import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MockHttpClient } from '../test/mock/http-client-mock';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

describe('ApiService', () => {
  let service: ApiService;
    let gitURL='https://api.github.com/users/'
    beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[ApiService,{ provide: HttpClient, UseValue: MockHttpClient },]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get user detail', () => {
   let httpMock = TestBed.inject(HttpTestingController);
    const githubUsername = 'testuser';
    const mockUserData = {
      avatar_url: "testurl",
      bio: "TestBio",
      followers: 2,
      following: 3,
      location: "Test",
      login: "testLogin",
      name: "TestName",
      twitter_username:"testUser"
    };
    service.getUser(githubUsername).subscribe(data => {
      expect(data).toEqual(mockUserData);
    });
    const req = httpMock.expectOne(gitURL+githubUsername);
    expect(req.request.method).toEqual('GET');
  });
  it('should get repo detail', () => {
   let httpMock = TestBed.inject(HttpTestingController);
   const githubUsername = 'testuser';
    const mockRepoData = [
      { id: 1, name: 'TestRepo1' },
      { id: 2, name: 'TestRepo2' },
    ];
    service.getRepoDetails(githubUsername).subscribe(data => {
      expect(data).toEqual(mockRepoData);
    });
    const req = httpMock.expectOne(gitURL+githubUsername+"/repos");
    expect(req.request.method).toEqual('GET');
  });
});
