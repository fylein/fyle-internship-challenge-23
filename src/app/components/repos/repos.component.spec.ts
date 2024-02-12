import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReposComponent } from './repos.component';

describe('ReposComponent', () => {
  let component: ReposComponent;
  let fixture: ComponentFixture<ReposComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReposComponent]
    });
    fixture = TestBed.createComponent(ReposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
