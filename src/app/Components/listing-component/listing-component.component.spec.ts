import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingComponentComponent } from './listing-component.component';

describe('ListingComponentComponent', () => {
  let component: ListingComponentComponent;
  let fixture: ComponentFixture<ListingComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
