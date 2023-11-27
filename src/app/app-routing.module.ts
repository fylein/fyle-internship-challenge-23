import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GithubSearchComponent } from './github-search/GithubSearchComponent';
import { GithubRepositoryListComponent } from './github-repository-list/github-repository-list.component';
import { AppComponent } from './app.component';
import { ErrorMessageBoxComponent } from './error-message-box/error-message-box.component';
import { SelektonComponent } from './selekton/selekton.component';


const  appRouter : Routes =[

  {path: 'search', component: GithubSearchComponent},
  {path:'repository', component: GithubRepositoryListComponent},
  {path:'UserNotFound',component: ErrorMessageBoxComponent },
  {path:'loading', component:SelektonComponent},
]


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRouter)],
  exports:[RouterModule],
})

export class AppRoutingModule {}
