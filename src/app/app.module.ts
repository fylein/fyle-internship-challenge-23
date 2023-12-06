import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { InvalidUserComponent } from './invalid-user/invalid-user.component';
import { BasicInfoComponent } from './profile/basic-info/basic-info.component';
import { RepositoriesComponent } from './profile/repositories/repositories.component';
import { PaginationComponent } from './profile/pagination/pagination.component';
import { CardComponent } from './profile/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HomeComponent,
    NavbarComponent,
    ProfileComponent,
    InvalidUserComponent,
    BasicInfoComponent,
    RepositoriesComponent,
    PaginationComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
