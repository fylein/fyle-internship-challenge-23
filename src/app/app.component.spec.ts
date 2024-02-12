import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { of, throwError } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    apiService = jasmine.createSpyObj('ApiService', ['getUserRepositories', 'getRepoDetails']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule, HttpClientModule],
      providers: [{ provide: ApiService, useValue: apiService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty repositories and not loading', () => {
    expect(component.repositories).toEqual([]);
    expect(component.loading).toBe(false);
  });

  it('should handle errors when fetching repositories', fakeAsync(() => {
    const username = 'sid120';
    const errorMessage = 'An error occurred!';
  
    spyOn(ApiService, 'getUserRepositories').and.callFake(() => {
      return throwError(errorMessage);
    });  
    component.username = username;
    component.searchUser();
  
    expect(apiService.getUserRepositories).toHaveBeenCalledWith(username, 1, component.itemsPerPage);
    expect(component.loading).toBe(true);
  
    tick(); 
  
    expect(component.loading).toBe(false);
    expect(component.repositories).toEqual([]);
  }));
  
});
