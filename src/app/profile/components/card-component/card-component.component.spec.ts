import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponentComponent } from './card-component.component';

describe('CardComponentComponent', () => {
  let component: CardComponentComponent;
  let fixture: ComponentFixture<CardComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponentComponent]
    });
    fixture = TestBed.createComponent(CardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
