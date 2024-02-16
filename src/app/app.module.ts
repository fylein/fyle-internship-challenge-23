import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api/api.service';
import { PollingService } from './services/polling/polling.service';
import { UserBioComponent } from './components/user-bio/user-bio.component';
import { CacheService } from './services/cache/cache.service';
import { ReposComponent } from './components/repos/repos.component';
import { SearchUserComponent } from './components/search-user/search-user.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FormsModule } from '@angular/forms';
import { appReducer } from './store/reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Effects } from './store/effects';
import { ErrorComponent } from './components/error/error.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    UserBioComponent,
    ReposComponent,
    SearchUserComponent,
    NavigationComponent,
    ErrorComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({ userState: appReducer }),
    EffectsModule.forRoot([Effects]),
  ],
  providers: [ApiService, PollingService, CacheService],
  bootstrap: [AppComponent],
})
export class AppModule {}
