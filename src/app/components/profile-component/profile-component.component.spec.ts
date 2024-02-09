import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponentComponent } from './profile-component.component';

describe('ProfileComponentComponent', () => {
  let component: ProfileComponentComponent;
  let fixture: ComponentFixture<ProfileComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponentComponent]
    });
    fixture = TestBed.createComponent(ProfileComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
