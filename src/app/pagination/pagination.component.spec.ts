import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    });

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render pagination controls when totalPages is provided', () => {
    component.totalPages = 10;
    fixture.detectChanges();

    const paginationContainer = fixture.nativeElement.querySelector('.mt-8.flex.flex-col');
    expect(paginationContainer).toBeTruthy();

    const prevButton = paginationContainer.querySelector('.bg-blue-500.text-white.px-3.py-2.rounded-md');
    expect(prevButton).toBeTruthy();
    expect(prevButton.textContent).toBe('Older');

    const pageNumberButtonsContainer = paginationContainer.querySelector('.flex.justify-center.space-x-2');
    expect(pageNumberButtonsContainer).toBeTruthy();
    expect(pageNumberButtonsContainer.querySelectorAll('a.bg-blue-100.text-blue-500.px-3.py-2.rounded-md').length).toBe(10);

    const nextButton = paginationContainer.querySelector('.bg-blue-500.text-white.px-3.py-2.rounded-md:last-child');
    expect(nextButton).toBeTruthy();
    expect(nextButton.textContent).toBe('Newer');
  });

  it('should emit pageChange event when onPageChange method is called', () => {
    const spy = jasmine.createSpy();
    component.pageChange.subscribe(spy);

    component.onPageChange('next');
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledOnceWith(2);
  });
});

