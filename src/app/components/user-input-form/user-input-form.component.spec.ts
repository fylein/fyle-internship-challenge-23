import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInputFormComponent } from './user-input-form.component';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('UserInputFormComponent', () => {
  let component: UserInputFormComponent;
  let fixture: ComponentFixture<UserInputFormComponent>;
  let toastrSpy = jasmine.createSpyObj('ToastrService', ['error']);
  let router = {
    navigate: jasmine.createSpy('navigate'),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserInputFormComponent],
      imports: [FormsModule],
      providers: [
        {
          provide: ApiService, useValue:
          {
            getUser: () => of(),
            getRepoDetails: () => of(),
          },
        },
        { provide: ToastrService, useValue: toastrSpy },
        { provide: Router, useValue: router },
      ],
    });
    fixture = TestBed.createComponent(UserInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call get user when username is given', () => {
    const apiService = TestBed.inject(ApiService);
    component.username = "testuser";
    spyOn(apiService, 'getUser').and.returnValue(of())
    component.onSubmit()
    expect(apiService.getUser).toHaveBeenCalled()
  });
  it('should show toast error message', () => {
    const apiService = TestBed.inject(ApiService);
    component.username = "testuser";
    const errorMessage = 'An error occurred';
    spyOn(apiService, 'getUser').and.returnValue(throwError({ error: { message: errorMessage } }));

    component.onSubmit()
    expect(router.navigate).not.toHaveBeenCalled();
    expect(toastrSpy.error).toHaveBeenCalledWith(errorMessage, 'Error');
  });
  it('should call get user when username is given', () => {
    const apiService = TestBed.inject(ApiService);
    component.username = "testuser";
    const mockUserData = {
      avatar_url: "testurl",
      bio: "TestBio",
      followers: 2,
      following: 3,
      location: "Test",
      login: "testLogin",
      name: "TestName",
      twitter_username: "testUser"
    };
    spyOn(apiService, 'getUser').and.returnValue(of(mockUserData))
    component.onSubmit()
    expect(apiService.getUser).toHaveBeenCalled()
    expect(router.navigate).toHaveBeenCalledWith(['/user-details']);
  });

  it('should show error when no input text provided', () => {
    component.username = '';
    component.onSubmit()
    expect(toastrSpy.error).toHaveBeenCalled();
  });
});
