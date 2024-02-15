import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserrepoComponent } from './userrepo.component';

describe('UserrepoComponent', () => {
  let component: UserrepoComponent;
  let fixture: ComponentFixture<UserrepoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserrepoComponent]
    });
    fixture = TestBed.createComponent(UserrepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
