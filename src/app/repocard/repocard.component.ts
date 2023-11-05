import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { repos } from '../shared/repos.model';
@Component({
  selector: 'app-repocard',
  templateUrl: './repocard.component.html',
  styleUrls: ['./repocard.component.scss']
})
export class RepocardComponent implements OnInit{
  constructor(private apiService: ApiService) {}

  repomodel: repos[] = [];


  ngOnInit(): void {
    this.repomodel = this.apiService.reposs;
    
      
  }
}
