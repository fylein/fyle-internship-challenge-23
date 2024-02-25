import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserreposComponent } from './userrepos.component';

describe('UserreposComponent', () => {
  let component: UserreposComponent;
  let fixture: ComponentFixture<UserreposComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserreposComponent]
    });
    fixture = TestBed.createComponent(UserreposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
