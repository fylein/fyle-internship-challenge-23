import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserPersonalComponent } from './user-personal.component';

describe('UserPersonalComponent', () => {
  let component: UserPersonalComponent;
  let fixture: ComponentFixture<UserPersonalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPersonalComponent],
      imports: [RouterTestingModule],
    });
    fixture = TestBed.createComponent(UserPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
