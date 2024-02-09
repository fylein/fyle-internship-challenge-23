import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './search/components/search-component/search-component.component';
import { Profile } from './profile/components/profile/profile.component';
import { InvalidUser  } from './invalid-user/components/invalid-user/invalid-user.component';

const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'user/:username', component: Profile },
  { path: '**', component: InvalidUser },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}