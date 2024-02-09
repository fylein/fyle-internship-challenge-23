import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvalidUser } from './components/invalid-user/invalid-user.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    InvalidUser,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class InvalidUserModule { }
