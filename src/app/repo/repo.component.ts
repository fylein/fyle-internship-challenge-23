import { Component, Input } from '@angular/core';
import { repo } from '../types';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.scss']
})
export class RepoComponent {
  @Input() repo:repo;
  constructor(){
    this.repo = {
      name:"",
      html_url:"",
      description:"",
      topics:[]
    }
  }
}
