import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UserInputComponent } from './user-input/user-input.component';
import { FormsModule } from '@angular/forms';
import { RepoListComponent } from './repo-list/repo-list.component';
import { PaginationComponent } from './pagination/pagination.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
@NgModule({
  declarations: [
    AppComponent,
    UserInputComponent,
    RepoListComponent,
    PaginationComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
