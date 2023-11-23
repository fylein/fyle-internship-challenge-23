import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { ApiService } from './services/api.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatChipsModule} from '@angular/material/chips';
import {MatGridListModule} from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReposgridComponent } from './reposgrid/reposgrid.component';
import { TopicsComponent } from './topics/topics.component';
import { FormComponent } from './form/form.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgxUiLoaderModule,NgxUiLoaderHttpModule  } from "ngx-ui-loader";
import { NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION, } from "ngx-ui-loader";

const ngxUiLoaderConfig : NgxUiLoaderConfig = {
  blur: 5,
  delay: 0,
  fastFadeOut: true,
  fgsColor: 'white',
  fgsPosition: POSITION.centerCenter,
  fgsSize: 20,
  fgsType: SPINNER.rotatingPlane, // foreground spinner type
  gap: 24,
  logoPosition: POSITION.centerCenter,
  logoSize: 50,
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: 'rgba(40, 40, 40, 0.8)',
  pbColor: 'red',
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 4, // progress bar thickness
  hasProgressBar: true,
  text: 'Loading',
  textColor: '#FFFFFF',
  textPosition: POSITION.centerCenter,
  maxTime: -1,
  minTime: 200,
};

@NgModule({
  declarations: [
    AppComponent,
    UserdetailComponent,
    PaginatorComponent,
    ReposgridComponent,
    TopicsComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatChipsModule,
    MatPaginatorModule,
    MatGridListModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    MatButtonModule, 
    MatIconModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({showForeground: true})
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
