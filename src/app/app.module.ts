import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UserreposComponent } from './userrepos/userrepos.component';
import { UserrepoComponent } from './userrepo/userrepo.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UserprofileComponent,
    UserreposComponent,
    UserrepoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
