import { TestBed } from '@angular/core/testing';
import { GithubService } from './github.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('GithubService', () => {
  let service: GithubService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule], // Ensure both modules are imported
      providers: [GithubService]
    });

    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user data', () => {
    const mockUserData = { /* Mock data */ };

    service.getUser('username').subscribe((data: any) => {
      expect(data).toEqual(mockUserData);
    }, (error: any) => {
      fail('getUser request failed');
    });

    const req = httpMock.expectOne('https://api.github.com/users/username');
    expect(req.request.method).toBe('GET');

    req.flush(mockUserData);
  });
});
