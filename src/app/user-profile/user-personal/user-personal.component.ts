import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-personal',
  templateUrl: './user-personal.component.html',
  styleUrls: ['./user-personal.component.scss'],
})
export class UserPersonalComponent {
  @Input() userPersonalData: any = {};
}
