import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBioComponent } from './user-bio.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from 'src/app/store/reducers';

describe('UserBioComponent', () => {
  let component: UserBioComponent;
  let fixture: ComponentFixture<UserBioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserBioComponent],
      imports: [StoreModule.forRoot({ userState: appReducer })],
    });
    fixture = TestBed.createComponent(UserBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
