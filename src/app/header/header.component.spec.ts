// header.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the application title in the template', () => {
    component.appTitle = 'RepoFetch';
    fixture.detectChanges(); // Trigger change detection
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('RepoFetch');
  });

});
