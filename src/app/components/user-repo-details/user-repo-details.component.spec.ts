import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UserRepoDetailsComponent } from './user-repo-details.component';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { of, throwError } from 'rxjs';

describe('UserRepoDetailsComponent', () => {
  let component: UserRepoDetailsComponent;
  let fixture: ComponentFixture<UserRepoDetailsComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;
  let spinnerSpy: jasmine.SpyObj<NgxSpinnerService>;

  beforeEach(() => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['getUser', 'getRepoDetails']);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['error']);
    spinnerSpy = jasmine.createSpyObj('NgxSpinnerService', ['show', 'hide', 'getSpinner']);
    TestBed.configureTestingModule({
      declarations: [UserRepoDetailsComponent],
      imports: [NgxSpinnerModule],
      providers: [
        NgxSpinnerService,
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: ToastrService, useValue: toastrSpy },
      ],
    });
    fixture = TestBed.createComponent(UserRepoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});