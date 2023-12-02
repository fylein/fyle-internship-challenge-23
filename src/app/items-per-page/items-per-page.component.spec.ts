import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsPerPageComponent } from './items-per-page.component';

describe('ItemsPerPageComponent', () => {
  let component: ItemsPerPageComponent;
  let fixture: ComponentFixture<ItemsPerPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsPerPageComponent]
    });

    fixture = TestBed.createComponent(ItemsPerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit itemsPerPageChange event when itemsPerPage property is changed', () => {
    const spy = jasmine.createSpy();
    component.itemsPerPageChange.subscribe(spy);

    component.itemsPerPage = 25;
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledOnceWith(25);
  });

  it('should update itemsPerPage property when select option is changed', () => {
    const selectElement = fixture.nativeElement.querySelector('select');

    selectElement.value = '50';
    fixture.detectChanges();

    expect(component.itemsPerPage).toBe(50);
  });
});
