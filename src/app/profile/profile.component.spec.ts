import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { ApiService } from '../services/api.service';
import { SharedDataService } from '../shared/shared-data.service';
import { of } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let sharedDataServiceSpy: jasmine.SpyObj<SharedDataService>;

  beforeEach(() => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['getRepo', 'getUser']);
    const sharedDataSpy = jasmine.createSpyObj('SharedDataService', ['searchedUser$']);

    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [
        { provide: ApiService, useValue: apiSpy },
        { provide: SharedDataService, useValue: sharedDataSpy }
      ]
    });

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    sharedDataServiceSpy = TestBed.inject(SharedDataService) as jasmine.SpyObj<SharedDataService>;
    fixture.detectChanges();
  });

  it('should handle pagination event', () => {
    
    const event: PageEvent = { pageIndex: 1, pageSize: 10, length: 30 };
    component.handlePaginate(event);
    expect(component.pageNo).toBe(2); 
    expect(component.perPage).toBe(10); 
    expect(component.loadingSkeleton).toBe(true); 
    expect(apiServiceSpy.getRepo).toHaveBeenCalledWith(component.userName, 2, 10); 
  });
});
