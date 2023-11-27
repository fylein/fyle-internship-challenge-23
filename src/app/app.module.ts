import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { GithubRepositoryListComponent } from './github-repository-list/github-repository-list.component';
import { GithubSearchComponent } from './github-search/GithubSearchComponent';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SelektonComponent } from './selekton/selekton.component';
import { ErrorMessageBoxComponent } from './error-message-box/error-message-box.component';




@NgModule({
  declarations: [
    AppComponent,
    GithubRepositoryListComponent,
    GithubSearchComponent,
    SelektonComponent,
    ErrorMessageBoxComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule,
    AppRoutingModule,
    NgxSkeletonLoaderModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
