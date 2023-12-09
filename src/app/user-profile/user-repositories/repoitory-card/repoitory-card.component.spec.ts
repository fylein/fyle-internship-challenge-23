import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoitoryCardComponent } from './repoitory-card.component';

describe('RepoitoryCardComponent', () => {
  let component: RepoitoryCardComponent;
  let fixture: ComponentFixture<RepoitoryCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepoitoryCardComponent]
    });
    fixture = TestBed.createComponent(RepoitoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
