import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { SearchComponent } from './search/search.component';
import { SkeletonLoaderComponent } from './skeleton-loader/skeleton-loader.component';
import { ProfileComponent } from './profile/profile.component';
import { RepositoriesComponent } from './repositories/repositories.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ItemsPerPageComponent } from './items-per-page/items-per-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SkeletonLoaderComponent,
    ProfileComponent,
    RepositoriesComponent,
    PaginationComponent,
    ItemsPerPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgxSkeletonLoaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
