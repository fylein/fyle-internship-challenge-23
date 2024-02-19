import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageComponent } from './language.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LanguageComponent', () => {
  let component: LanguageComponent;
  let fixture: ComponentFixture<LanguageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageComponent],
      imports: [ HttpClientTestingModule ],

    });
    fixture = TestBed.createComponent(LanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
