import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReposListComponent } from './repos-list.component';

describe('ReposListComponent', () => {
  let component: ReposListComponent;
  let fixture: ComponentFixture<ReposListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReposListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReposListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
