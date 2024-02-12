import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingCardComponent } from './loading-card.component';

describe('LoadingCardComponent', () => {
  let component: LoadingCardComponent;
  let fixture: ComponentFixture<LoadingCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingCardComponent]
    });
    fixture = TestBed.createComponent(LoadingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
