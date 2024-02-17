import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilPaginationComponent } from './util-pagination.component';

describe('UtilPaginationComponent', () => {
  let component: UtilPaginationComponent;
  let fixture: ComponentFixture<UtilPaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtilPaginationComponent]
    });
    fixture = TestBed.createComponent(UtilPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
