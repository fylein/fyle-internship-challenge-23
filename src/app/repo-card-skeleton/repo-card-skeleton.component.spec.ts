import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoCardSkeletonComponent } from './repo-card-skeleton.component';

describe('RepoCardSkeletonComponent', () => {
  let component: RepoCardSkeletonComponent;
  let fixture: ComponentFixture<RepoCardSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepoCardSkeletonComponent]
    });
    fixture = TestBed.createComponent(RepoCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
