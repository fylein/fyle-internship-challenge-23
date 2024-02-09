import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidUser } from './invalid-user.component';

describe('InvalidUserComponent', () => {
  let component: InvalidUser;
  let fixture: ComponentFixture<InvalidUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvalidUser]
    });
    fixture = TestBed.createComponent(InvalidUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
