// footer.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
    });

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the current year in the copyright information', () => {
    const currentYear = new Date().getFullYear();
    component.currentYear = currentYear;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const copyrightText = compiled.querySelector('#copyright-text').textContent;

    // Check that the copyright text contains the correct current year
    expect(copyrightText).toContain(`${currentYear}`);
  });
});
