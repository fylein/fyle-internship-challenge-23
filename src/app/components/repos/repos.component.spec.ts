import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReposComponent } from './repos.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from 'src/app/store/reducers';

describe('ReposComponent', () => {
  let component: ReposComponent;
  let fixture: ComponentFixture<ReposComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReposComponent],
      imports: [StoreModule.forRoot({ userState: appReducer })],
    });
    fixture = TestBed.createComponent(ReposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
