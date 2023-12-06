import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { UserProfileComponent } from './user-profile/user-profile.component';
// import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { InvalidUserComponent } from './invalid-user/invalid-user.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user/:username', component: ProfileComponent },
  { path: '**', component: InvalidUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [HomeComponent]
