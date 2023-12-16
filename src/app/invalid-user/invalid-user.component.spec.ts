import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvalidUserComponent } from './invalid-user.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';

describe('InvalidUserComponent', () => {
  let component: InvalidUserComponent;
  let fixture: ComponentFixture<InvalidUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvalidUserComponent, NavbarComponent],
      imports: [FormsModule]
    });
    fixture = TestBed.createComponent(InvalidUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
