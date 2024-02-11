import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from  '@angular/common/http';
import { UserInputComponent } from './user-input/user-input.component';
import { FormsModule } from '@angular/forms';
import { RepoListComponent } from './repo-list/repo-list.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CacheInterceptor } from './interceptors/cache.interceptor';
import { UserCardComponent } from './user-card/user-card.component';
import { RepoCardComponent } from './repo-card/repo-card.component';
import { RepoCardSkeletonComponent } from './repo-card-skeleton/repo-card-skeleton.component';
import { UserCardSkeletonComponent } from './user-card-skeleton/user-card-skeleton.component'; // Import the interceptor

@NgModule({
  declarations: [
    AppComponent,
    UserInputComponent,
    RepoListComponent,
    PaginationComponent,
    UserCardComponent,
    RepoCardComponent,
    RepoCardSkeletonComponent,
    UserCardSkeletonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true } // Register the interceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
