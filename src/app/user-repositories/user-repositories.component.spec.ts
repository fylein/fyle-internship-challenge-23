import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRepositoriesComponent } from './user-repositories.component';

describe('UserRepositoriesComponent', () => {
  let component: UserRepositoriesComponent;
  let fixture: ComponentFixture<UserRepositoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserRepositoriesComponent]
    });
    fixture = TestBed.createComponent(UserRepositoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
