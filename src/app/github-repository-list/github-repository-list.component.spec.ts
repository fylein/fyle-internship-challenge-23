import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubRepositoryListComponent } from './github-repository-list.component';

describe('GithubRepositoryListComponent', () => {
  let component: GithubRepositoryListComponent;
  let fixture: ComponentFixture<GithubRepositoryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GithubRepositoryListComponent]
    });
    fixture = TestBed.createComponent(GithubRepositoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
