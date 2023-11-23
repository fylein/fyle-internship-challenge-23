import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRepositoriesComponent } from './user-repositories.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

import { RepositoriesPaginationComponent } from './repositories-pagination/repositories-pagination.component';
import { FormsModule } from '@angular/forms';

describe('UserRepositoriesComponent', () => {
  let component: UserRepositoriesComponent;
  let fixture: ComponentFixture<UserRepositoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserRepositoriesComponent,
        RepositoriesPaginationComponent,
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        FormsModule,
      ],
    });
    fixture = TestBed.createComponent(UserRepositoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
