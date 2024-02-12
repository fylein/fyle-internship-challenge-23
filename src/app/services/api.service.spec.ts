import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { users } from './mock-data/users';
import { repositoriesOfUser } from './mock-data/mock-repos';

describe('ApiService', () => {
  let service: ApiService;
  let testController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiService);
    testController = TestBed.inject(HttpTestingController)
  });

  // It should create the service
  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  // it should validate the variable values
  it('should validate the variables values', () => {
    expect(service.searchVal).toBe('meghasharma0');
    // expect(service.avatarUrl).toBe('');
    // expect(service.name).toBe('');
    // expect(service.noOfRepos).toBe(0);
    // expect(service.repos).toEqual(null);
    // expect(service.slicedRepo).toEqual(null);
    // expect(service.currPage).toBe(1);
    // expect(service.arr).toEqual(null);
    // expect(service.arr2).toEqual(null);
    // expect(service.options).toEqual([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
    // expect(service.loader).toEqual(true);
    // expect(service.totalPages).toBe(0);
    // expect(service.pageNumbers).toEqual([]);
  })

  // It should get all the users
  it('should get all the users and related repos', async() => {
    service.getUser('meghasharma0').subscribe((res: any) => {
      expect(res).toBeTruthy();
      expect(res.user.length).toBe(5);
      const user = res.user.find((u: any) => u.id === 4);
      expect(user.name).toBe('User Four');
      expect(user.avatarUrl).toBe('someUrl four');
      expect(user.repos.length).toBe(3);
      const findRepo = res.repos.find((r: any) => r.rId === 1);
      expect(findRepo.rName).toBe('repo1User1');
      expect(findRepo.desc).toBe('repDesc1User1');
    });
    const mockReq = testController.expectOne(`https://api.github.com/users/meghasharma0`);
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush(Object.values(users));
  });

  // it should get all the languages
  it('should get all languages and details', async() => {
    service.getLanguages('meghasharma0', 'CSS-small-projects').subscribe((res: any) => {
      expect(res).toBeTruthy();
      expect(res.length).toBe(14);
      const obj = res.find((o: any) => o.id === 7);
      expect(obj.name).toBe('repo seven');
      expect(obj.des).toBe('repo seven description');
    });
    const mockReq = testController.expectOne(`https://api.github.com/repos/meghasharma0/CSS-small-projects/languages`);
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush(repositoriesOfUser);
  });
});