import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoSidenevComponent } from './repo-sidenev.component';

describe('RepoSidenevComponent', () => {
  let component: RepoSidenevComponent;
  let fixture: ComponentFixture<RepoSidenevComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepoSidenevComponent]
    });
    fixture = TestBed.createComponent(RepoSidenevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
