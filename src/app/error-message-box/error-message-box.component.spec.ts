import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMessageBoxComponent } from './error-message-box.component';

describe('ErrorMessageBoxComponent', () => {
  let component: ErrorMessageBoxComponent;
  let fixture: ComponentFixture<ErrorMessageBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorMessageBoxComponent]
    });
    fixture = TestBed.createComponent(ErrorMessageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
