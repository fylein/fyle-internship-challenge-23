import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonRepositoriesComponent } from './person-repositories.component';

describe('PersonRepositoriesComponent', () => {
  let component: PersonRepositoriesComponent;
  let fixture: ComponentFixture<PersonRepositoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonRepositoriesComponent]
    });
    fixture = TestBed.createComponent(PersonRepositoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
