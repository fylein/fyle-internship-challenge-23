import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { users } from './mock-data/users';

describe('ApiService', () => {
  let service: ApiService;
  let testController: HttpTestingController // testController of type HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiService);
    testController = TestBed.inject(HttpTestingController)
  });

  // It should get all the users
  it('should get all the users', () => {
    service.getUser('meghasharma0').subscribe((res: any) => {
      expect(res).toBeTruthy();
      expect(res.length).toBe(5);
      const user = res.find((u: any) => u.id === 4);
      expect(user.name).toBe('User Four');
      expect(user.avatarUrl).toBe('someUrl four');
      expect(user.repos.length).toBe(3);
    });
    const mockReq = testController.expectOne(`https://api.github.com/users/meghasharma0`);
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush(Object.values(users));
  });

  // it should get all the repo details.
  it('should get all the repositories details', () => {
    service.getRepos('meghasharma0').subscribe((res: any) => {
      expect(res).toBeTruthy();
      const user = res.find((u: any) => u.id === 2);
      const repo = user.repos.find((r: any) => r.rId === 1);
      expect(repo.rName).toBe('repo1User2');
    });
    const mockReq = testController.expectOne(`https://api.github.com/users/meghasharma0/repos`);
    mockReq.flush(Object.values(users));
  });
});
