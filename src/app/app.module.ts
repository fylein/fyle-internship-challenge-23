import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { UserInputFormComponent } from './components/user-input-form/user-input-form.component';
import { UserRepoDetailsComponent } from './components/user-repo-details/user-repo-details.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule, } from 'ngx-toastr';
import { ApiService } from './services/api.service';

const routes: Routes = [
  { path: '', component: UserInputFormComponent },
  { path: 'user-details', component: UserRepoDetailsComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    UserInputFormComponent,
    UserRepoDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot(),
    FontAwesomeModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
