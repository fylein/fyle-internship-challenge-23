import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AppComponent } from './app.component';
import { GithubProfileComponent } from './github-profile/github-profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GithubService } from './github.service';
import { LoadingSkeletonComponent } from './loading-skeleton/loading-skeleton.component';



@NgModule({
  declarations: [
    AppComponent,
    GithubProfileComponent,
    NavbarComponent,
    LoadingSkeletonComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [GithubService], // Add GithubService to providers
  bootstrap: [AppComponent]
})
export class AppModule { }
