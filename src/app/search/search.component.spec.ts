import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent]
    });

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchUserEvent when searchUser method is called', () => {
    const spy = jasmine.createSpy();
    component.searchUserEvent.subscribe(spy);

    component.searchUser();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledOnceWith(component.userName);
  });

  it('should update userName property when input value is changed', () => {
    const inputElement = fixture.nativeElement.querySelector('input.border.p-2.rounded-md.w-full.md:w-64.placeholder-gray-500.bg-gray-100.shadow-md');
    inputElement.value = 'testuser';
    inputElement.dispatchEvent(new Event('input'));

    expect(component.userName).toBe('testuser');
  });
});
