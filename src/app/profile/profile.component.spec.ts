import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { SimpleChange } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { ApiService, GitHubUser } from '../services/api.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { RepositoriesComponent } from './repositories/repositories.component';
import { PaginationComponent } from './pagination/pagination.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  const mockActivatedRoute = {
    params: of({ username: 'lklivingstone' }),
  };

  beforeEach(async(() => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['getUser', 'setUserData', 'getUserData']);

    TestBed.configureTestingModule({
      declarations: [ProfileComponent, NavbarComponent, BasicInfoComponent, RepositoriesComponent, PaginationComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ApiService, useValue: apiSpy },
      ],
    })
    .compileComponents();

    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
