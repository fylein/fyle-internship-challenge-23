import { Component ,OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { LanguageComponent } from './language/language.component';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent  {

constructor(public apiService: ApiService){}

first :number = 0
rows:number =10
languages :any = []



onPageChange = (event :any)=>{
  this.first = event.first;
  this.rows = event.rows;
}
}
