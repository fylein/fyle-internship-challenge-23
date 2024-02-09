import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SearchComponent } from './search-component.component';
import { fakeAsync, tick } from '@angular/core/testing';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [FormsModule, RouterTestingModule.withRoutes([{ path: 'user/:username', component: SearchComponent }]),
    ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update searchQuery when the input changes', () => {
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
  
    inputElement.value = 'lk';
    inputElement.dispatchEvent(new Event('input'));
  
    fixture.detectChanges();
  
    const compiled = fixture.debugElement.nativeElement;
    const inputValue = compiled.querySelector('input').value;
  
    expect(inputValue).toEqual('lk');
  });  

  it('should call onSubmit when the button is clicked', () => {
    spyOn(component, 'onSubmit');

    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    const fakeEvent = { preventDefault: () => {} };
    buttonElement.click(fakeEvent);

    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should set isInputError to true if searchQuery is empty', () => {
    component.searchQuery = '';
    const fakeEvent = new Event('submit');
    spyOn(fakeEvent, 'preventDefault');
    component.onSubmit(fakeEvent);
  
    expect(component.isInputError).toBe(true);
  });
  
  it('should set isInputError to false if searchQuery is not empty and valid', () => {
    component.searchQuery = 'lk';
    const fakeEvent = new Event('submit');
    spyOn(fakeEvent, 'preventDefault');
    component.onSubmit(fakeEvent);

    expect(component.isInputError).toBe(false);
  });
  
  it('should call router.navigate with correct parameters when searchQuery is not empty', fakeAsync(() => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.searchQuery = 'lk';
    const fakeEvent = new Event('submit');
    spyOn(fakeEvent, 'preventDefault');
    component.onSubmit(fakeEvent);
  
    tick();
  
    expect(navigateSpy).toHaveBeenCalledWith(['/user', 'lk'], {
      queryParams: { page: 1, per_page: 10 },
    });
  }));
  
  it('should not call router.navigate when searchQuery is empty', () => {
    const navigateSpy = spyOn((<any>component).router, 'navigate');
    component.searchQuery = '';
    const fakeEvent = new Event('submit');
    spyOn(fakeEvent, 'preventDefault');
    component.onSubmit(fakeEvent);
  
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('should set isInputError to true and display correct error message if searchQuery is empty', () => {
    component.searchQuery = '';
    const fakeEvent = new Event('submit');
    spyOn(fakeEvent, 'preventDefault');
    component.onSubmit(fakeEvent);
  
    expect(component.isInputError).toBe(true);
    expect(component.inputErrorMessage).toBe('Username cannot be empty.');
  });

  it('should set isInputError to true and display correct error message if searchQuery contains spaces', () => {
    component.searchQuery = 'l k';
    const fakeEvent = new Event('submit');
    spyOn(fakeEvent, 'preventDefault');
    component.onSubmit(fakeEvent);

    expect(component.isInputError).toBe(true);
    expect(component.inputErrorMessage).toBe('Username contains space.');
  });

  it('should set isInputError to false if searchQuery is not empty and does not contain spaces', () => {
    component.searchQuery = 'lk';
    const fakeEvent = new Event('submit');
    spyOn(fakeEvent, 'preventDefault');
    component.onSubmit(fakeEvent);

    expect(component.isInputError).toBe(false);
    expect(component.inputErrorMessage).toBe('');
  });
});
