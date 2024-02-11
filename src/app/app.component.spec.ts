import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiService: ApiService;
  let httpMock: HttpTestingController;
  
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule, NgxPaginationModule, HttpClientModule],
      providers: [ApiService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user details', waitForAsync(() => {
    const userDetails = { avatar_url: 'test-avatar.jpg', html_url: 'https://github.com/test-user' };
    spyOn(apiService, 'getUser').and.returnValue(of(userDetails));
    component.getUser();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.userDetails).toEqual(userDetails);
    });
  }));

  it('should fetch user repositories', waitForAsync(() => {
    const userRepos = [
      { name: 'Repo 1', description: 'Description 1', language: 'JavaScript' },
      { name: 'Repo 2', description: 'Description 2', language: 'TypeScript' }
    ];
    spyOn(apiService, 'getUserRepository').and.returnValue(of(userRepos));
    component.getUserallRepo();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.userAllRepo).toEqual(userRepos);
    });
  }));
});
