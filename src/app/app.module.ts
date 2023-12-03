import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { SearchComponentComponent } from './Components/search-component/search-component.component';
import { ButtonComponent } from './Components/button/button.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ReposListComponent } from './Components/repos-list/repos-list.component';
import { ProfileComponentComponent } from './Components/profile-component/profile-component.component';
import { RepoBoxComponent } from './Components/repo-box/repo-box.component';
import { LanguageBoxComponent } from './Components/language-box/language-box.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponentComponent,
    ButtonComponent,
    ReposListComponent,
    ProfileComponentComponent,
    RepoBoxComponent,
    LanguageBoxComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgxSkeletonLoaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
