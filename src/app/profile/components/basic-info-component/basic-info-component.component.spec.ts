import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInfoComponentComponent } from './basic-info-component.component';

describe('BasicInfoComponentComponent', () => {
  let component: BasicInfoComponentComponent;
  let fixture: ComponentFixture<BasicInfoComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasicInfoComponentComponent]
    });
    fixture = TestBed.createComponent(BasicInfoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
