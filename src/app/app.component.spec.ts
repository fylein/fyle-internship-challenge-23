import { TestBed } from '@angular/core/testing';
import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent]
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  }));

  it(`should have as title 'fyle-frontend-challenge'`, () => {
  it(`should have as title 'gg'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('fyle-frontend-challenge');
  });
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('gg');
  }));

  it('should render title', () => {
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('fyle-frontend-challenge app is running!');
  });
});
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to gg!');
  }));
});
 17 changes: 5 additions & 12 deletions17  
src/app/app.component.ts
@@ -1,17 +1,10 @@
import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  selector: 'gg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.apiService.getUser('johnpapa').subscribe(console.log);
  }
}
export class AppComponent {
  title = 'gg';
}
