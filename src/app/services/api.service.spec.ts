import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { USERS } from '../model/user';

describe('ApiService', () => {
  let service: ApiService;
  let testingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiService);
    testingController = TestBed.inject(HttpTestingController)
  });
  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //Getting userId by Username Unit Test

  it('should get useId by username', () => {
    service.getUser('Kasraf20').subscribe((user:any) =>{
      expect(user).toBeTruthy()
      expect(user.id).toBe(1)
    })
    const mockReq = testingController.expectOne(`https://api.github.com/users/Kasraf20/repos`)
    expect(mockReq.request.method).toEqual('GET')
    mockReq.flush(USERS[1])
  });

});
