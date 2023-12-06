import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasicInfoComponent } from './basic-info.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ApiService, GitHubUser } from 'src/app/services/api.service';

describe('BasicInfoComponent', () => {
  let component: BasicInfoComponent;
  let fixture: ComponentFixture<BasicInfoComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const activatedRouteStub = {
      params: of({ username: 'testuser' }),
    };

    apiServiceSpy = jasmine.createSpyObj('ApiService', ['getUser', 'setUserData', 'getUserData']);

    TestBed.configureTestingModule({
      declarations: [BasicInfoComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: ApiService, useValue: apiServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(BasicInfoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to user data on init', () => {
    const userData: GitHubUser = {
      name: 'Test User',
      bio: 'This is a test bio',
      location: 'Test Location',
      twitter_username: 'test_twitter',
      html_url: 'https://github.com/testuser',
      avatar_url: 'https://github.com/testuser/avatar',
      public_repos: 42,
    };

    apiServiceSpy.getUser.and.returnValue(of(userData));
    apiServiceSpy.getUserData.and.returnValue(of(userData));

    fixture.detectChanges();

    expect(apiServiceSpy.getUser).toHaveBeenCalledWith('testuser');
    expect(apiServiceSpy.setUserData).toHaveBeenCalledWith(userData);
    expect(component.userData).toEqual(userData);
  });

  it('should re-subscribe to user data on changes', () => {
    const userData: GitHubUser = {
      name: 'Updated User',
      bio: 'This is an updated bio',
      location: 'Updated Location',
      twitter_username: 'updated_twitter',
      html_url: 'https://github.com/testuser',
      avatar_url: 'https://github.com/testuser/avatar',
      public_repos: 42,
    };

    apiServiceSpy.getUser.and.returnValue(of(userData));
    apiServiceSpy.getUserData.and.returnValue(of(userData));

    component.username = 'updateduser';
    component.ngOnChanges({ username: { previousValue: 'testuser', currentValue: 'updateduser', firstChange: false, isFirstChange: () => false } });

    expect(apiServiceSpy.getUser).toHaveBeenCalledWith('updateduser');
    expect(apiServiceSpy.setUserData).toHaveBeenCalledWith(userData);
    expect(component.userData).toEqual(userData);
  });
});
