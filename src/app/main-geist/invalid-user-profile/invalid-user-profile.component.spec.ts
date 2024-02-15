import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidUserProfileComponent } from './invalid-user-profile.component';

describe('InvalidUserProfileComponent', () => {
  let component: InvalidUserProfileComponent;
  let fixture: ComponentFixture<InvalidUserProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvalidUserProfileComponent]
    });
    fixture = TestBed.createComponent(InvalidUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
