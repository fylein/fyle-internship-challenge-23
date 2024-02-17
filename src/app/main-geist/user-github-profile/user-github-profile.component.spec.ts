import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGithubProfileComponent } from './user-github-profile.component';

describe('UserGithubProfileComponent', () => {
  let component: UserGithubProfileComponent;
  let fixture: ComponentFixture<UserGithubProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserGithubProfileComponent]
    });
    fixture = TestBed.createComponent(UserGithubProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
