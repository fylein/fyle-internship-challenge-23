import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [FormsModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update searchQuery when the input changes', () => {
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
  
    inputElement.value = 'newUsername';
    inputElement.dispatchEvent(new Event('input'));
  
    fixture.detectChanges();
  
    const compiled = fixture.debugElement.nativeElement;
    const inputValue = compiled.querySelector('input').value;
  
    expect(inputValue).toEqual('newUsername');
  });  

  it('should call onSubmit when the button is clicked', () => {
    spyOn(component, 'onSubmit');

    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    buttonElement.click();

    expect(component.onSubmit).toHaveBeenCalled();
  });
});
