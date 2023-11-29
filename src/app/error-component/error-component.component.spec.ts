import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorComponentComponent } from './error-component.component';

describe('ErrorComponentComponent', () => {
  let component: ErrorComponentComponent;
  let fixture: ComponentFixture<ErrorComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorComponentComponent]
    });
    fixture = TestBed.createComponent(ErrorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
