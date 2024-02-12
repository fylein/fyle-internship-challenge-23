import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubUserReposSkeletonLoaderComponent } from './github-user-repos-skeleton-loader.component';

describe('GithubUserReposSkeletonLoaderComponent', () => {
  let component: GithubUserReposSkeletonLoaderComponent;
  let fixture: ComponentFixture<GithubUserReposSkeletonLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GithubUserReposSkeletonLoaderComponent]
    });
    fixture = TestBed.createComponent(GithubUserReposSkeletonLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
