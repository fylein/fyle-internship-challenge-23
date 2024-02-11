import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ApiCacheInterceptor } from './interceptors/api-cache.interceptor';
import { ApiCacheService } from './services/api-cache.service';
import { ApiService } from './services/api.service';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserReposComponent } from './user-repos/user-repos.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    UserProfileComponent,
    UserInfoComponent,
    UserReposComponent,
    PaginationComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiCacheInterceptor, multi: true },
    ApiCacheService,
    ApiService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
