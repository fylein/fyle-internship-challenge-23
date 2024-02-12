import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubRepoListComponent } from './github-repo-list.component';

describe('GithubRepoListComponent', () => {
  let component: GithubRepoListComponent;
  let fixture: ComponentFixture<GithubRepoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GithubRepoListComponent]
    });
    fixture = TestBed.createComponent(GithubRepoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
