import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoriesPaginationComponent } from './repositories-pagination.component';

describe('RepositoriesPaginationComponent', () => {
  let component: RepositoriesPaginationComponent;
  let fixture: ComponentFixture<RepositoriesPaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepositoriesPaginationComponent]
    });
    fixture = TestBed.createComponent(RepositoriesPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
