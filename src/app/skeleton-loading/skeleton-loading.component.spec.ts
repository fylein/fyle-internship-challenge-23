import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonLoadingComponent } from './skeleton-loading.component';

describe('SkeletonLoadingComponent', () => {
  let component: SkeletonLoadingComponent;
  let fixture: ComponentFixture<SkeletonLoadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkeletonLoadingComponent]
    });
    fixture = TestBed.createComponent(SkeletonLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
