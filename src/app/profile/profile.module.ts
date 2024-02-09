import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Profile } from './components/profile/profile.component';
import { BasicInfoComponent } from './components/basic-info-component/basic-info-component.component';
import { CardComponent } from './components/card-component/card-component.component';
import { PaginationComponent } from './components/pagination-component/pagination-component.component';
import { RepositoriesComponent } from './components/repositories-component/repositories-component.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    Profile,
    BasicInfoComponent,
    CardComponent,
    PaginationComponent,
    RepositoriesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ]
})
export class ProfileModule { }
