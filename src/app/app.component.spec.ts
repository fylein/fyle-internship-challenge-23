import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {  HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reposReducer, userReducer } from './state/app.reducers';
import { UserCardComponent } from './user-card/user-card.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';

xdescribe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent,UserCardComponent,SearchBarComponent],
    imports:[
      HttpClientModule,
      StoreModule.forRoot({user:userReducer,repos:reposReducer}),
      FormsModule
    ]

  }));


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges()
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
