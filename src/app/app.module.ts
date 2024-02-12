import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { RepoListComponent } from './repo-list/repo-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import { LoadingSkeletonComponent } from './loading-skeleton/loading-skeleton.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    RepoListComponent,
    LoadingSkeletonComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  checked: boolean = false;
  disabled: boolean = true;
 }
