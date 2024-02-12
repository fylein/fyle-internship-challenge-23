import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubUserProfileComponent } from './github-user-profile.component';

describe('GithubUserProfileComponent', () => {
  let component: GithubUserProfileComponent;
  let fixture: ComponentFixture<GithubUserProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GithubUserProfileComponent]
    });
    fixture = TestBed.createComponent(GithubUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
