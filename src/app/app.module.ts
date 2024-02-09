import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from  '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { SearchModule } from './search/search.module';
import { ProfileModule } from './profile/profile.module';
import { InvalidUserModule } from './invalid-user/invalid-user.module';

import { AppComponent } from './app.component';
import { CacheService } from './services/cache-services/cache-service.service';
import { CacheInterceptor } from './interceptors/cache-interceptor/cache-interceptor.interceptor';
import { ApiService } from './services/api.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    SearchModule,
    ProfileModule,
    InvalidUserModule,
    SharedModule
  ],
  providers: [
    ApiService,
    CacheService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
