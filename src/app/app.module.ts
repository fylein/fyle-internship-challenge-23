import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { AppComponent } from './app.component';

import { ProfileComponent } from './components/profile/profile.component';
import { DescriptionComponent } from './components/description/description.component';

import { ApiService } from './services/api.service';
import { ReposComponent } from './components/repos/repos.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    DescriptionComponent,
    ReposComponent,
  ],
  imports: [BrowserModule, HttpClientModule, NgxSkeletonLoaderModule],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
