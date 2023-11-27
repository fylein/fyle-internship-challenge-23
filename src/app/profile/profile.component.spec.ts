import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProfileComponent } from './profile.component';
import { ApiService } from '../services/api.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', ['getSearchTerm', 'getUser', 'setTotalPages', 'setCurrPage']);

    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [{ provide: ApiService, useValue: spy }],
    });

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and subscribe to getSearchTerm', () => {
    const searchTerm = 'testUser';
    apiService.getSearchTerm.and.returnValue(of(searchTerm));

    fixture.detectChanges();

    expect(component.isLoading).toBe(true);
    expect(apiService.getSearchTerm).toHaveBeenCalled();
    expect(apiService.getUser).toHaveBeenCalledWith(); // getUser should be called on subscription to getSearchTerm
    expect(component.isLoading).toBe(false);
  });

  it('should call getUser and update user information', () => {
    const mockUser = { login: 'testUser', public_repos: 10 };

    apiService.getSearchTerm.and.returnValue(of('testUser'));
    apiService.getUser.and.returnValue(of(mockUser));

    fixture.detectChanges();

    component.getUser(); // Manually call getUser

    expect(component.isLoading).toBe(true);
    expect(apiService.getUser).toHaveBeenCalled();
    expect(component.user).toEqual(mockUser);
    expect(apiService.setTotalPages).toHaveBeenCalledWith(2); // Math.floor((10 + 7) / 8) = 2
    expect(apiService.setCurrPage).toHaveBeenCalledWith(1);
    expect(component.isLoading).toBe(false);
  });

});
