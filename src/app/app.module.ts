import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [AppComponent, PaginationComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
