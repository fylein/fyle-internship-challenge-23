import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent],
    imports: [HttpClientTestingModule,HttpClientModule],
    providers: [ApiService]
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService)as jasmine.SpyObj<ApiService>;;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  it('should initialize component', () => {
    spyOn(apiService, 'getUser').and.returnValue(of({ login: 'johnpapa' }));
    spyOn(apiService, 'getAllRepo').and.returnValue(of([]));
    component.ngOnInit();
    expect(apiService.getUser).toHaveBeenCalled();
    expect(apiService.getAllRepo).toHaveBeenCalled();
  });
  it('should handle search', () => {
    spyOn(apiService, 'getUser').and.returnValue(of({ login: 'johnpapa' }));
    spyOn(apiService, 'getAllRepo').and.returnValue(of([]));
    component.onSearch('johnpapa');
    expect(apiService.getUser).toHaveBeenCalledWith('johnpapa');
    expect(apiService.getAllRepo).toHaveBeenCalledWith('johnpapa');
  });
  it('should handle search error getUser', () => {
    spyOn(apiService, 'getUser').and.returnValue(throwError("error"));
    component.onSearch('invalid_user');
    expect(component.notFoundError).toBeTrue();
    expect(component.showLoading).toBeFalse();
  });
  it('should handle search error getAllRepo', () => {
    spyOn(apiService, 'getUser').and.returnValue(of({ login: 'johnpapa' }));
    spyOn(apiService, 'getAllRepo').and.returnValue(throwError("error"));
    component.onSearch('johnpapa');
    expect(component.notFoundError).toBeTrue();
    expect(component.showLoading).toBeFalse();
  });

  it('should handle repo pagination', () => {
    const page = 2;
    component.pageChanged(page);
    expect(component.currentRepoPage).toBe(page);
  });
  

});
