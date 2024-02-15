import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
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

describe('AppComponent', () => {
  beforeEach(() =>
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
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should not render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span'))?.toBeNull();
  });
});
