import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[ApiService]
    });
    service = TestBed.inject(ApiService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return github user', () => {
    
    expect(service.getUser('johnpapa')).toBeTruthy()
    
  });

  it('should return github repositories', () => {
    
    expect(service.getRepos('johnpapa',1,10)).toBeTruthy()
    
  });

  it('should return languages', () => {
    
    expect(service.getLanguages('johnpapa',{"name":"Angular-NuGet"})).toBeTruthy()
      
    })
    
    
    
    
  });


  

