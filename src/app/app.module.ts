import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { AppComponent } from './app.component';

import { ProfileComponent } from './components/profile/profile.component';
import { DescriptionComponent } from './components/description/description.component';

import { ApiService } from './services/api.service';
import { ReposComponent } from './components/repos/repos.component';
import { HeaderComponent } from './components/header/header.component';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ReposkeletonComponent } from './components/reposkeleton/reposkeleton.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    DescriptionComponent,
    ReposComponent,
    HeaderComponent,
    SkeletonComponent,
    ReposkeletonComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
    MatPaginatorModule,
  ],
  providers: [ApiService, provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
