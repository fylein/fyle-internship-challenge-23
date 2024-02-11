import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingUserCardComponent } from './loading-user-card.component';

describe('LoadingUserCardComponent', () => {
  let component: LoadingUserCardComponent;
  let fixture: ComponentFixture<LoadingUserCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingUserCardComponent]
    });
    fixture = TestBed.createComponent(LoadingUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
