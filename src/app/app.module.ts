import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainGeistComponent } from './main-geist/main-geist.component';
import { FooterComponent } from './footer/footer.component';
import { UserInputComponent } from './main-geist/user-input/user-input.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { UtilPaginationComponent } from './main-geist/util-pagination/util-pagination.component';
import { UserRepoListComponent } from './main-geist/user-repo-list/user-repo-list.component';
import { UserGithubProfileComponent } from './main-geist/user-github-profile/user-github-profile.component';
import { InvalidUserProfileComponent } from './main-geist/invalid-user-profile/invalid-user-profile.component';
import { UtilUserProfileLoaderComponent } from './main-geist/util-user-profile-loader/util-user-profile-loader.component';
import { UtilUserRepoLoaderComponent } from './main-geist/util-user-repo-loader/util-user-repo-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainGeistComponent,
    UserInputComponent,
    UtilPaginationComponent,
    UserRepoListComponent,
    UserGithubProfileComponent,
    FooterComponent,
    InvalidUserProfileComponent,
    UtilUserProfileLoaderComponent,
    UtilUserRepoLoaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxSkeletonLoaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
