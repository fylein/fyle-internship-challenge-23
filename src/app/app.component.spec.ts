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

  it('should subscribe and update loadError during ngOnInit', () => {
    const mockData = {
      loadError: { isLoading: false, isError: false, isDirty: false },
    };
    storeMock.select.and.returnValue(of(mockData));

    // ngOnInit
    component.ngOnInit();

    expect(component.loadErrorSub).toBeDefined();
    expect(storeMock.select).toHaveBeenCalled();
  });

  it('should unsubscribe on ngOnDestroy', () => {
    const mockData = {
      loadError: { isLoading: false, isError: false, isDirty: false },
    };
    storeMock.select.and.returnValue(of(mockData));
    component.ngOnInit();

    let leSpy = spyOn(component['loadErrorSub'], 'unsubscribe');
    component.ngOnDestroy();
    expect(leSpy).toHaveBeenCalled();
  });
});
