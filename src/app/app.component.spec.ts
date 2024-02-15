// app.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainGeistComponent } from './main-geist/main-geist.component';
import { FooterComponent } from './footer/footer.component';
import { UserInputComponent } from './main-geist/user-input/user-input.component';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        MainGeistComponent,
        FooterComponent,
        UserInputComponent,
        NgxSkeletonLoaderComponent,
      ],
      imports: [HttpClientModule, FormsModule],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should have appTitle in the template', () => {
    component.appTitle = 'REPOFETCH';
    fixture.detectChanges(); // Trigger change detection
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-header').textContent).toContain(
      'REPOFETCH'
    );
  });
});
