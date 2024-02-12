import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  let component: AppComponent;

  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent],
    imports: [AppModule]
  }).compileComponents().then(() =>{
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })
  );

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render the SearchComponent', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-search')).toBeTruthy(); 
  })

  it('should render the MainBodyComponent', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-main-body')).toBeTruthy(); 
  });

  it('should render the PaginationComponent', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-pagination')).toBeTruthy(); 
  })
});
