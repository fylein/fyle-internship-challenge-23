import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GithubUserProfileComponent } from './components/github-user-profile/github-user-profile.component';
import { GithubUserReposComponent } from './components/github-user-repos/github-user-repos.component';

const routes: Routes = [

  {
    path:'profile' , component:GithubUserProfileComponent
  },
  {
    path:'repo' , component:GithubUserReposComponent
  },
  {
    path:"**", component:GithubUserProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
