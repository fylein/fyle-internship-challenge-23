import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { SharedDataService } from './shared/shared-data.service';

describe('AppComponent', () => {
  const apiSpy = jasmine.createSpyObj('ApiService', ['getRepo', 'getUser']);
  const sharedDataSpy = jasmine.createSpyObj('SharedDataService', [
    'searchedUser$',
  ]);
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: ApiService, useValue: apiSpy },
        { provide: SharedDataService, useValue: sharedDataSpy },
      ],
    }),
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'fyle-frontend-challenge'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('fyle-frontend-challenge');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain(
      'fyle-frontend-challenge app is running!',
    );
  });
});
