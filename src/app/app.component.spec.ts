import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { UserInputFormComponent } from './components/user-input-form/user-input-form.component';
import { UserRepoDetailsComponent } from './components/user-repo-details/user-repo-details.component';

describe('AppComponent', () => {
  const routes: Routes = [
    { path: '', component: UserInputFormComponent },
    { path: 'user-details/:username', component: UserRepoDetailsComponent }
  ];
  beforeEach(() => TestBed.configureTestingModule({
    imports:[  RouterModule.forRoot(routes),],
    declarations: [AppComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
