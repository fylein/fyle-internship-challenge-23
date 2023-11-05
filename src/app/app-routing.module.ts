import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from "./Components/home-page/home-page.component";
import { ListingComponentComponent } from "./Components/listing-component/listing-component.component";

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: ':userName/Dashboard', component: ListingComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
