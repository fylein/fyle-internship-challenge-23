import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { RepoListComponent } from './repo-list.component';
import { GithubService } from '../services/github.service';
import { User } from '../Model/user';
import { Repo } from '../Model/repo';

describe('RepoListComponent', () => {
  let component: RepoListComponent;
  let fixture: ComponentFixture<RepoListComponent>;
  let githubService: jasmine.SpyObj<GithubService>;

  beforeEach(() => {
    const githubServiceSpy = jasmine.createSpyObj('GithubService', ['getUser', 'getUserRepos']);

    TestBed.configureTestingModule({
      declarations: [RepoListComponent],
      providers: [{ provide: GithubService, useValue: githubServiceSpy }]
    });

    fixture = TestBed.createComponent(RepoListComponent);
    component = fixture.componentInstance;
    githubService = TestBed.inject(GithubService) as jasmine.SpyObj<GithubService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user profile and repos on input change', fakeAsync(() => {
    const mockUser: User = {
      id: 123,
      login: 'mockuser',
      name: 'Mock User',
      img_url: 'https://example.com/avatar.png',
      public_repos: 2, // Assuming the user has 2 public repositories
      bio: 'i am a developer',
      followers: 20,
      following: 2,
      twitter_username: 'atmalviya',
      blog: 'www.google.com'
      
    };

    const mockRepos: Repo[] = [
      { id: 1, name: 'repo1', description: 'description 1', html_url: 'https://github.com/repo1', topics: [] },
      { id: 2, name: 'repo2', description: 'description 2', html_url: 'https://github.com/repo2', topics: [] }
    ];

    githubService.getUser.and.returnValue(of(mockUser));
    githubService.getUserRepos.and.returnValue(of(mockRepos));

    component.userName = 'mockuser';
    component.ngOnChanges();
    tick(); // Wait for asynchronous operations to complete

    expect(component.user).toEqual(mockUser);
    expect(component.repos).toEqual(mockRepos);
    expect(component.totalRepos).toEqual(2);
    expect(component.totalPages).toEqual(1);
  }));

  it('should handle error when fetching user profile', fakeAsync(() => {
    const errorMessage = 'Error fetching user profile';
    githubService.getUser.and.returnValue(throwError({ status: 404, error: errorMessage }));
  
    // Ensure that githubService.getUserRepos is also set up to return an observable
    githubService.getUserRepos.and.returnValue(of([])); // Simulate empty repos for this test
  
    component.userName = 'nonexistentuser';
    component.ngOnChanges();
    tick();
  
    expect(component.error).toEqual(errorMessage);
    expect(component.user).toBeUndefined();
    expect(component.repos).toEqual([]);
    expect(component.totalRepos).toEqual(0);
    expect(component.totalPages).toEqual(1);
  }));
  
  
  

  it('should handle error when fetching user repos', fakeAsync(() => {
    const errorMessage = 'Error fetching user repos';
  
    // Set up both methods to return an error
    githubService.getUser.and.returnValue(throwError({ status: 404, error: errorMessage }));
    githubService.getUserRepos.and.returnValue(throwError(errorMessage));
  
    component.userName = 'mockuser';
    component.ngOnChanges();
    tick();
  
    expect(component.error).toEqual(errorMessage);
    expect(component.user).toBeUndefined();
    expect(component.repos).toEqual([]);
    expect(component.totalRepos).toEqual(0);
    expect(component.totalPages).toEqual(1);
  }));
  
  

  
});
