import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppInterceptor } from './app.interceptor';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { LoatingCompoentComponent } from './Components/loating-compoent/loating-compoent.component';
import { ListingComponentComponent } from './Components/listing-component/listing-component.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { ApiService } from "./config/api.service";
import { ConfigService } from "./config/config.service";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './Components/header/header.component';
import { SearchFilterPipe } from './Components/home-page/search-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoatingCompoentComponent,
    ListingComponentComponent,
    HomePageComponent,
    HeaderComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [
    ApiService,
    ConfigService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
      },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
