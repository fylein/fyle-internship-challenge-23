import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Profile } from './profile.component';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { BasicInfoComponent } from '../basic-info-component/basic-info-component.component';
import { CardComponent } from '../card-component/card-component.component';
import { RepositoriesComponent } from '../repositories-component/repositories-component.component';
import { PaginationComponent } from '../pagination-component/pagination-component.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from 'src/app/services/api.service';

describe('ProfileComponent', () => {
  let component: Profile;
  let fixture: ComponentFixture<Profile>;

  beforeEach(() => {
    const activatedRouteStub = {
      params: of({ username: 'lklivingstone' }),
      queryParams: {
        subscribe: (fn: (value: any) => void) => fn({ page: 1, per_page: 10 }), 
      },
    };

    const apiServiceMock = {
      getRepos: jasmine.createSpy('getRepos').and.returnValue(of([])),
      getReposCount: jasmine.createSpy('getReposCount').and.returnValue(of(0)),
      getError404Status: jasmine.createSpy('getError404Status').and.returnValue(of(false)),
    };

    TestBed.configureTestingModule({
      declarations: [
        Profile,
        NavbarComponent,
        BasicInfoComponent,
        CardComponent,
        RepositoriesComponent,
        PaginationComponent
      ],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: ApiService, useValue: apiServiceMock },
      ],
    });

    fixture = TestBed.createComponent(Profile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
