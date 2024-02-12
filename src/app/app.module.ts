import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { InputBoxComponent } from './input-box/input-box.component';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { HeroComponent } from './hero/hero.component';
import { RepoListComponent } from './hero/repo-list/repo-list.component';
import { SkeletonLoadingComponent } from './skeleton-loading/skeleton-loading.component';


@NgModule({
  declarations: [
    AppComponent,
    InputBoxComponent,
    HeroComponent,
    RepoListComponent,
    SkeletonLoadingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,  
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
