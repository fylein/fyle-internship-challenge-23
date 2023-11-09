import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from './services/api.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    apiService = jasmine.createSpyObj('ApiService', ['getUser', 'getRepos', 'getRepoLanguages']);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ApiService, useValue: apiService }
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.userDetails).toBeUndefined();
    expect(component.userRepos).toEqual([]);
    expect(component.userName).toEqual('');
    expect(component.itemsPerPage).toEqual(10);
    expect(component.totalPages).toEqual(0);
    expect(component.totalItems).toEqual(0);
    expect(component.currentPage).toEqual(1);
    expect(component.isLoading).toEqual(false);
  });

  it('should fetch user details and repositories on ngOnInit', fakeAsync(() => {
    const userDetails = { name: 'John Doe', public_repos: 5, repos_url: 'https://api.github.com/users/johndoe/repos' };
    const userRepos = [{ name: 'repo1' }, { name: 'repo2' }];

    spyOn(apiService, 'getUser').and.returnValue(of(userDetails));
    spyOn(apiService, 'getRepos').and.returnValue(of(userRepos));

    fixture.detectChanges();

    component.ngOnInit();
    tick(1000);

    expect(component.userDetails).toEqual(userDetails);
    expect(component.totalItems).toEqual(userDetails.public_repos);
    expect(component.totalPages).toEqual(1);
    expect(component.userRepos).toEqual(userRepos);
    expect(component.isLoading).toEqual(false);
  }));

  it('should update user name and trigger fetchUserDetails', () => {
    const newUserName = 'newUser';

    component.userName = newUserName;
    spyOn(component, 'fetchUserDetails');

    component.updateUserName();

    expect(component.userName).toEqual(newUserName);
    expect(component.fetchUserDetails).toHaveBeenCalledWith(newUserName);
  });

  it('should not fetch user details if userName is empty', () => {
    component.userName = '';
    component.fetchUserDetails(component.userName);
    expect(apiService.getUser).not.toHaveBeenCalled();
  });

  it('should handle page change when clicking "Next"', () => {
    component.totalPages = 3;
    component.currentPage = 1;
    component.userDetails = { repos_url: 'https://api.github.com/users/johndoe/repos' };
    spyOn(component, 'fetchUserRepos');

    component.handlePageChange('next');

    expect(component.currentPage).toEqual(2);
    expect(component.fetchUserRepos).toHaveBeenCalledWith(component.userDetails.repos_url, 2, component.itemsPerPage);
  });

  it('should handle page change when clicking "Previous"', () => {
    const userDetails = {
      repos_url: 'https://api.github.com/users/johndoe/repos',
    };

    component.totalPages = 3;
    component.currentPage = 1;
    component.userDetails = userDetails;
    spyOn(component, 'fetchUserRepos');

    component.handlePageChange(2);

    expect(component.currentPage).toEqual(2);
    expect(component.fetchUserRepos).toHaveBeenCalledWith(userDetails.repos_url, 2, component.itemsPerPage);
  });

  it('should handle page change when clicking on a specific page number', () => {
    const userDetails = {
      repos_url: 'https://api.github.com/users/johndoe/repos',
    };

    component.totalPages = 3;
    component.currentPage = 1;
    component.userDetails = userDetails;
    spyOn(component, 'fetchUserRepos');

    component.handlePageChange(2);

    expect(component.currentPage).toEqual(2);
    expect(component.fetchUserRepos).toHaveBeenCalledWith(userDetails.repos_url, 2, component.itemsPerPage);
  });
});
