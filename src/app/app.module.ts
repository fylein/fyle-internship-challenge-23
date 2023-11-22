import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserPersonalComponent } from './user-profile/user-personal/user-personal.component';
import { UserRepositoriesComponent } from './user-profile/user-repositories/user-repositories.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    NotFoundComponent,
    UserPersonalComponent,
    UserRepositoriesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
