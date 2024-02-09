import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonUserCardComponent } from './skeleton-user-card.component';

describe('SkeletonUserCardComponent', () => {
  let component: SkeletonUserCardComponent;
  let fixture: ComponentFixture<SkeletonUserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonUserCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkeletonUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
