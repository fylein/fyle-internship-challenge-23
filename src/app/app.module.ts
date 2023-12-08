import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DisplaySectionComponent } from './display-section/display-section.component';
import { GithubService } from './github.service';
import { InputSectionComponent } from './input-section/input-section.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    InputSectionComponent,
    DisplaySectionComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule

  ],
  providers: [GithubService],
  bootstrap: [AppComponent]
})
export class AppModule { }