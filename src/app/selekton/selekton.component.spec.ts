import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelektonComponent } from './selekton.component';

describe('SelektonComponent', () => {
  let component: SelektonComponent;
  let fixture: ComponentFixture<SelektonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelektonComponent]
    });
    fixture = TestBed.createComponent(SelektonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
