import { TestBed} from '@angular/core/testing';

import { ApiService } from './api.service';
import {HttpClientTestingModule,HttpTestingController} from '@angular/common/http/testing'
import { repo } from '../types';


describe('ApiService', () => {
  let service: ApiService;
  let httpMock : HttpTestingController
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,

      ],
      providers:[ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController)
    
  });

  afterEach(()=>{
    httpMock.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the user',()=>{
    let mockData = {
      login:"VaibhaV-R-N",
      name:"vaibhav",
      avatar_url:"https://avatars.githubusercontent.com/u/91965015?v=4",
      html_url:"https://github.com/VaibhaV-R-N",
      location: "India",
      email:null,
      followers:10,
      following:10,
      public_repos:21,
    }

    service.getUser("VaibhaV-R-N").subscribe(data => {
      expect(data).toEqual(mockData);
    });
  
    const req = httpMock.expectOne('https://api.github.com/users/VaibhaV-R-N');
    expect(req.request.method).toBe('GET');
  
    req.flush(mockData);
    
  })

  it('should get the repo',()=>{
    service.getRepos("VaibhaV-R-N","1","10").subscribe(data => {
      expect(data).toBeInstanceOf(Array<repo>);
    });
  
    const req = httpMock.expectOne('https://api.github.com/users/VaibhaV-R-N/repos?page=1&per_page=10');
    expect(req.request.method).toBe('GET');
  
  })

});
