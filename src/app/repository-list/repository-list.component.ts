import { Component,Input } from '@angular/core';
import { Observable } from 'rxjs';
import { REPO } from '../services/data';

@Component({
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent {
@Input('noOfPages$') noOfPages!: Observable<number[]>;
@Input('repos$') repos!:Observable<REPO[]>;
@Input() pagination!:number;


}
