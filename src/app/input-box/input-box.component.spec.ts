import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBoxComponent } from './input-box.component';

describe('InputBoxComponent', () => {
  let component: InputBoxComponent;
  let fixture: ComponentFixture<InputBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputBoxComponent]
    });
    fixture = TestBed.createComponent(InputBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
