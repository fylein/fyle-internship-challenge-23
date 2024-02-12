import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { SharedDataService } from '../shared/shared-data.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let sharedDataServiceSpy: jasmine.SpyObj<SharedDataService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('SharedDataService', ['updateSearchedUser']);

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: SharedDataService, useValue: spy }]
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    sharedDataServiceSpy = TestBed.inject(SharedDataService) as jasmine.SpyObj<SharedDataService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateSearchedUser method of SharedDataService with the provided username', () => {
    const userName = 'john_doe';
    component.searchUser(userName);
    expect(sharedDataServiceSpy.updateSearchedUser).toHaveBeenCalledWith(userName);
  });

  it('should call updateSearchedUser method of SharedDataService with an empty string if no username provided', () => {
    component.searchUser('');
    expect(sharedDataServiceSpy.updateSearchedUser).toHaveBeenCalledWith('');
  });
});

