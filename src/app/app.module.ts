// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { ApiService } from './services/api.service';
import { UserInputComponent } from './user-input/user-input.component';
import { UserRepositoriesComponent } from './user-repositories/user-repositories.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SkeletonComponent } from './skeleton/skeleton.component';
@NgModule({
  declarations: [
    AppComponent,
    UserInputComponent,
    UserRepositoriesComponent,
    SkeletonComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatPaginatorModule,
    HttpClientModule,
    NgxSkeletonLoaderModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
  
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
