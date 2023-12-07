import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { SimpleChange } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { ApiService, GitHubUser, GitHubRepository } from '../services/api.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { RepositoriesComponent } from './repositories/repositories.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FormsModule } from '@angular/forms'; // Import the FormsModule


describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  const mockUsername = "lklivingstone";
  let mockApiService: jasmine.SpyObj<ApiService>;
  const mockActivatedRoute = {
    params: of({ username: 'lklivingstone' }),
    queryParams: {
      subscribe: (fn: (value: any) => void) => fn({ page: 1, per_page: 10 }), 
    }
  };

  beforeEach(waitForAsync(() => {
    mockApiService = jasmine.createSpyObj('ApiService', ['getUser', 'setUserData', 'getUserData', 'getRepos', 'getReposCount']);

    TestBed.configureTestingModule({
      declarations: [ProfileComponent, NavbarComponent, BasicInfoComponent, RepositoriesComponent, PaginationComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ApiService, useValue: mockApiService },
      ],
      imports: [FormsModule]
    })
    .compileComponents();

    mockApiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const mockUser: GitHubUser = {
      name: 'John Doe',
      bio: 'Some bio',
      location: 'Some location',
      twitter_username: 'twitterHandle',
      html_url: 'https://github.com/johndoe',
      avatar_url: 'https://github.com/johndoe/avatar',
      public_repos: 10
    };
    mockApiService.getUser.and.returnValue(of(mockUser));
    const mockRepos: GitHubRepository[] = [
      { id: 1, name: 'Repo1', description: 'Description1', topics: ['Topic1'], url: 'Repo1Url' },
      // Add more mock repositories if needed
    ];
    mockApiService.getRepos.and.returnValue(of(mockRepos));

    
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      // Now you can make assertions
      expect(component).toBeTruthy();
      // Add more assertions if needed
    });  });
});
