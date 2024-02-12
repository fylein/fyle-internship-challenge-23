import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';

describe('AppComponent', () => {
  let el : DebugElement
  beforeEach(() => TestBed.configureTestingModule({
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    declarations: [AppComponent],
    imports: [HttpClientTestingModule]
  }));

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
    const app = fixture.componentInstance;
    var a = ["foo", "bar", "baz"];
    expect(a).toContain("bar");
  });

  //Checking error message
 
  it(`check error message'`, () => {
    const fixture = TestBed.createComponent(AppComponent); 
    const app = fixture.componentInstance;
    expect(app.errorMessage).toEqual('Post not available');
  });

});
