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
  })
  );

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render the MainBodyComponent', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-main-body')).toBeTruthy(); 
  });
});
