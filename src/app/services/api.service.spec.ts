import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { take } from 'rxjs/operators';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure that no unexpected requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user information', (done) => {
    const mockUser = { login: 'coolestnick', id: 123 };

    service.getUser().subscribe((user: any) => {
      expect(user).toEqual(mockUser);
      done();
    });

    const req = httpTestingController.expectOne('https://api.github.com/users/coolestnick');
    expect(req.request.method).toEqual('GET');
    req.flush(mockUser);
  });

  it('should get repositories', (done) => {
    const mockRepos = [{ id: 1, name: 'repo1' }, { id: 2, name: 'repo2' }];

    service.getRepos().subscribe((repos) => {
      expect(repos).toEqual(mockRepos);
      done();
    });

    const req = httpTestingController.expectOne('https://api.github.com/users/coolestnick/repos?page=1&per_page=8');
    expect(req.request.method).toEqual('GET');
    req.flush(mockRepos);
  });

  it('should handle errors when getting repositories', (done) => {
    const errorMessage = '404 Not Found';

    service.getRepos().pipe(take(1)).subscribe(
      () => {
        // If this block runs, there's an issue
        fail('Expected error but received data');
        done();
      },
      (error) => {
        expect(error.status).toEqual(404);
        expect(error.statusText).toEqual(errorMessage);
        done();
      }
    );

    const req = httpTestingController.expectOne('https://api.github.com/users/coolestnick/repos?page=1&per_page=8');
    expect(req.request.method).toEqual('GET');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

});
