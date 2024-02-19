import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { UserCardComponent } from './user-card/user-card.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule ,provideState,provideStore} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reposReducer, userReducer } from './state/app.reducers';
import { appEffects } from './state/app.effects';
import { RepoComponent } from './repo/repo.component';
import { ApiService } from './services/api.service';



@NgModule({
  declarations: [
    AppComponent,
    UserCardComponent,
    SearchBarComponent,
    RepoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    StoreModule.forRoot({user:userReducer,repos:reposReducer}),
    EffectsModule.forRoot([appEffects])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
