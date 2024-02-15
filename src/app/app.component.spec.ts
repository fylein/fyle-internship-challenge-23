import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { StoreModule, Store } from '@ngrx/store';
import { appReducer } from './store/reducers';
import { SearchUserComponent } from './components/search-user/search-user.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { UserBioComponent } from './components/user-bio/user-bio.component';
import { ReposComponent } from './components/repos/repos.component';
import { EffectsModule } from '@ngrx/effects';
import { Effects } from './store/effects';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';
import { selectState } from './store/selectors';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let storeMock: jasmine.SpyObj<Store>;

  beforeEach(() => {
    storeMock = jasmine.createSpyObj('Store', ['select', 'dispatch']);

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        UserBioComponent,
        ReposComponent,
        SearchUserComponent,
        NavigationComponent,
      ],
      imports: [
        StoreModule.forRoot({ userState: appReducer }),
        EffectsModule.forRoot([Effects]),
        FormsModule,
        BrowserModule,
        HttpClientModule,
      ],
      providers: [{ provide: Store, useValue: storeMock }],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe and update responseLength during ngOnInit', () => {
    const mockData = {
      repos: [
        {
          name: 'Basic-MERN-CRUD',
          html_url: 'www.xyz.com',
          startgazers_count: 5,
          description: 'Here goes desc',
        },

        {
          name: 'Basic-MERN-CRUD-Backend',
          html_url: 'www.abcxyz.com',
          startgazers_count: 5,
          description: 'Here goes desc',
        },
        {
          name: 'BasicGalleryApp',
          html_url: 'www.xyzz.com',
          startgazers_count: 5,
          description: 'Here goes desc',
        },
        {
          name: 'DeeTomPanda',
          html_url: 'www.xxyz.com',
          startgazers_count: 4,
          description: 'Here goes desc',
        },

        {
          name: 'Devops_dummy_test',
          html_url: 'www.xyyz.com',
          startgazers_count: 2,
          description: 'Here goes desc',
        },
      ],
    };
    storeMock.select.and.returnValue(of(mockData));

    // ngOnInit
    component.ngOnInit();

    expect(component.dataLengthSub).toBeDefined();
    expect(component.responseLength).toEqual(mockData.repos.length);
    expect(storeMock.select).toHaveBeenCalled();
  });

  it('should unsubscribe on ngOnDestroy', () => {
    const mockData = {
      repos: [
        {
          name: 'Basic-MERN-CRUD',
          html_url: 'www.xyz.com',
          startgazers_count: 5,
          description: 'Here goes desc',
        },

        {
          name: 'Basic-MERN-CRUD-Backend',
          html_url: 'www.abcxyz.com',
          startgazers_count: 5,
          description: 'Here goes desc',
        },
        {
          name: 'BasicGalleryApp',
          html_url: 'www.xyzz.com',
          startgazers_count: 5,
          description: 'Here goes desc',
        },
        {
          name: 'DeeTomPanda',
          html_url: 'www.xxyz.com',
          startgazers_count: 4,
          description: 'Here goes desc',
        },

        {
          name: 'Devops_dummy_test',
          html_url: 'www.xyyz.com',
          startgazers_count: 2,
          description: 'Here goes desc',
        },
      ],
    };
    storeMock.select.and.returnValue(of(mockData));
    component.ngOnInit();
    expect(component.dataLengthSub).toBeDefined();

    let spy = spyOn(component['dataLengthSub'], 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
