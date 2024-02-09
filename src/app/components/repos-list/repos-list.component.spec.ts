import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReposListComponent } from './repos-list.component';

describe('ReposListComponent', () => {
  let component: ReposListComponent;
  let fixture: ComponentFixture<ReposListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReposListComponent]
    });
    fixture = TestBed.createComponent(ReposListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
