import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ProfileComponent } from './profile.component';
import { ProfileService } from '../../services/api.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [MatPaginatorModule, MatSelectModule, BrowserAnimationsModule, FormsModule],
      providers: [ProfileService],
    });

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update profile when calling findProfile', () => {
    const profileService = TestBed.inject(ProfileService);
    spyOn(profileService, 'getProfileInfo').and.returnValue(of({ /* mocked profile data */ }));

    component.username = 'testuser';
    component.findProfile();

    expect(profileService.updateProfile).toHaveBeenCalledWith('testuser');
    expect(component.loading).toBe(false);
    expect(component.profile).toBeDefined();
  });

  it('should fetch repositories when calling fetchRepos', () => {
    const profileService = TestBed.inject(ProfileService);
    spyOn(profileService, 'getProfileRepos').and.returnValue(of([{ /* mocked repo data */ }]));

    component.fetchRepos();

    expect(component.repos).toBeDefined();
    expect(component.paginator.length).toBe(component.repos.length);
  });

  it('should handle page change', () => {
    const pageEvent = { pageIndex: 1, pageSize: 10 } as any;
    spyOn(component, 'fetchRepos');

    component.onPageChange(pageEvent);

    expect(component.currentPage).toBe(2); // pageIndex + 1
    expect(component.pageSize).toBe(10);
    expect(component.fetchRepos).toHaveBeenCalled();
  });

  it('should handle page size change', () => {
    const event = { target: { value: '25' } } as any;
    spyOn(component, 'fetchRepos');

    component.onPageSizeChange(event);

    expect(component.pageSize).toBe(25);
    expect(component.currentPage).toBe(1);
    expect(component.fetchRepos).toHaveBeenCalled();
  });

  it('should go to previous page', () => {
    component.currentPage = 3;
    spyOn(component, 'fetchRepos');

    component.goToPreviousPage();

    expect(component.currentPage).toBe(2);
    expect(component.fetchRepos).toHaveBeenCalled();
  });

  it('should go to next page', () => {
    component.currentPage = 2;
    component.pageSize = 10;
    component.repos = new Array(20); // Mocking repos for two pages
    spyOn(component, 'fetchRepos');

    component.goToNextPage();

    expect(component.currentPage).toBe(3);
    expect(component.fetchRepos).toHaveBeenCalled();
  });

  // Add more tests as needed
});
