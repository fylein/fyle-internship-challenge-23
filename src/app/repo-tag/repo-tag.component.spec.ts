import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoTagComponent } from './repo-tag.component';

describe('RepoTagComponent', () => {
  let component: RepoTagComponent;
  let fixture: ComponentFixture<RepoTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepoTagComponent]
    });
    fixture = TestBed.createComponent(RepoTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
