import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvalidUser } from './invalid-user.component';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { FormsModule } from '@angular/forms';

describe('InvalidUserComponent', () => {
  let component: InvalidUser;
  let fixture: ComponentFixture<InvalidUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvalidUser, NavbarComponent],
      imports: [FormsModule]
    });
    fixture = TestBed.createComponent(InvalidUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
