import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponentComponent } from './pagination-component.component';

describe('PaginationComponentComponent', () => {
  let component: PaginationComponentComponent;
  let fixture: ComponentFixture<PaginationComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponentComponent]
    });
    fixture = TestBed.createComponent(PaginationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
