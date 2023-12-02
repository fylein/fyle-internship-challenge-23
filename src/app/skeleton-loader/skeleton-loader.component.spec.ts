import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SkeletonLoaderComponent } from './skeleton-loader.component';

describe('SkeletonLoaderComponent', () => {
  let component: SkeletonLoaderComponent;
  let fixture: ComponentFixture<SkeletonLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletonLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the skeleton loader when isLoading is true', () => {
    component.isLoading = true;
    fixture.detectChanges();
    const loaderElement = fixture.debugElement.query(By.css('.skeleton-loader'));
    expect(loaderElement).not.toBeNull();
  });

  it('should not display the skeleton loader when isLoading is false', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const loaderElement = fixture.debugElement.query(By.css('.skeleton-loader'));
    expect(loaderElement).toBeNull();
  });

  it('should display user details skeleton type when skeletonType is user-details', () => {
    component.isLoading = true;
    component.skeletonType = 'user-details';
    fixture.detectChanges();
    const userDetailsElement = fixture.debugElement.query(By.css('.skeleton-details'));
    expect(userDetailsElement).not.toBeNull();
  });

  it('should not display user details skeleton when skeletonType is not user-details', () => {
    component.isLoading = true;
    component.skeletonType = 'other-type';
    fixture.detectChanges();
    const userDetailsElement = fixture.debugElement.query(By.css('.skeleton-details'));
    expect(userDetailsElement).toBeNull();
  });

  it('should display content when isLoading is false', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const contentElement = fixture.debugElement.query(By.css('ng-content'));
    expect(contentElement).not.toBeNull();
  });
});
