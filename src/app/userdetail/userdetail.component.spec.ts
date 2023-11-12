import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdetailComponent } from './userdetail.component';
import { User } from '../user';
import { testUser } from '../test';

describe('UserdetailComponent', () => {
  let component: UserdetailComponent;
  let fixture: ComponentFixture<UserdetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserdetailComponent]
    });
    fixture = TestBed.createComponent(UserdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept type "User" from parent componenet', () => {
    component.user = testUser;
    fixture.detectChanges();

    expect(component.user).toEqual(testUser);
  })
});
