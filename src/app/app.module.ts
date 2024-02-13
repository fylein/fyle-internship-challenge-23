import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { GithubUserProfileComponent } from './components/github-user-profile/github-user-profile.component';
import { GithubUserProfileSkeletonLoaderComponent } from './components/github-user-profile-skeleton-loader/github-user-profile-skeleton-loader.component';
import { GithubUserReposComponent } from './components/github-user-repos/github-user-repos.component';
import { GithubUserReposSkeletonLoaderComponent } from './components/github-user-repos-skeleton-loader/github-user-repos-skeleton-loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    GithubUserProfileComponent,
    GithubUserProfileSkeletonLoaderComponent,
    GithubUserReposComponent,
    GithubUserReposSkeletonLoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
