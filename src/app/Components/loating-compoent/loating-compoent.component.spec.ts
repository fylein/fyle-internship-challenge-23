import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoatingCompoentComponent } from './loating-compoent.component';

describe('LoatingCompoentComponent', () => {
  let component: LoatingCompoentComponent;
  let fixture: ComponentFixture<LoatingCompoentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoatingCompoentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoatingCompoentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
