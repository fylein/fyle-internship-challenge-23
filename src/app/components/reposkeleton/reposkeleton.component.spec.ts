import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReposkeletonComponent } from './reposkeleton.component';

describe('ReposkeletonComponent', () => {
  let component: ReposkeletonComponent;
  let fixture: ComponentFixture<ReposkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReposkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReposkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
