import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoriesComponentComponent } from './repositories-component.component';

describe('RepositoriesComponentComponent', () => {
  let component: RepositoriesComponentComponent;
  let fixture: ComponentFixture<RepositoriesComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepositoriesComponentComponent]
    });
    fixture = TestBed.createComponent(RepositoriesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
