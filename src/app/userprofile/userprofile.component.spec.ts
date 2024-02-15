import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprofileComponent } from './userprofile.component';

describe('UserprofileComponent', () => {
  let component: UserprofileComponent;
  let fixture: ComponentFixture<UserprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserprofileComponent]
    });
    fixture = TestBed.createComponent(UserprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
