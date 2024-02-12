import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve user repositories', () => {
    const mockRepos = [
      { id: 1, name: 'repo1' },
      { id: 2, name: 'repo2' },
    ];

    const username = 'testuser';
    const pageNo = 1;
    const perPage = 10;

    service.getRepos(username, pageNo, perPage).subscribe((repos) => {
      expect(repos.length).toBe(2);
      expect(repos).toEqual(mockRepos);
    });

    const req = httpMock.expectOne(
      `https://api.github.com/users/${username}/repos?page=${pageNo}&per_page=${perPage}`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockRepos);
  });
});
