import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { CardComponent } from './card/card.component';
import { RepositoriesComponent } from './repositories/repositories.component';
import { RepoTagComponent } from './repo-tag/repo-tag.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    RepositoriesComponent,
    RepoTagComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
