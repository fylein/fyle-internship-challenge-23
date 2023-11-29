import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { FrontSearchingComponent } from './front-searching/front-searching.component';
import { PersonRepositoriesComponent } from './person-repositories/person-repositories.component';
import { SingleRepoComponent } from './single-repo/single-repo.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { LoadingComponentComponent } from './loading-component/loading-component.component';
import { ErrorComponentComponent } from './error-component/error-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
@NgModule({
  declarations: [
    AppComponent,
    FrontSearchingComponent,
    PersonRepositoriesComponent,
    SingleRepoComponent,
    PersonDetailsComponent,
    LoadingComponentComponent,
    ErrorComponentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    FontAwesomeModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
