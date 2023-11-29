import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontSearchingComponent } from './front-searching.component';

describe('FrontSearchingComponent', () => {
  let component: FrontSearchingComponent;
  let fixture: ComponentFixture<FrontSearchingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrontSearchingComponent]
    });
    fixture = TestBed.createComponent(FrontSearchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
