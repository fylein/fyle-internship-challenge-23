import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserPersonalComponent } from './user-profile/user-personal/user-personal.component';
import { UserRepositoriesComponent } from './user-profile/user-repositories/user-repositories.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RepoitoryCardComponent } from './user-profile/user-repositories/repoitory-card/repoitory-card.component';
import { RepositoriesPaginationComponent } from './user-profile/user-repositories/repositories-pagination/repositories-pagination.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { GlobalErrorHandler } from './errorhandler.service';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    NotFoundComponent,
    UserPersonalComponent,
    UserRepositoriesComponent,
    NavbarComponent,
    RepoitoryCardComponent,
    RepositoriesPaginationComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
  ],
  providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler }],
  bootstrap: [AppComponent],
})
export class AppModule {}
