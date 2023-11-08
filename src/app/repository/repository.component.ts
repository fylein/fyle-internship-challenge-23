import { Component,Input,OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit {
  @Input() repo:any;
  @Input() user:any;
  languages: any[]=[];
  @Input() isLoading:Boolean=true;

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.apiService.getLanguages(this.user?.login,this.repo).subscribe(data=>{
      this.languages=Object.keys(data)
      console.log(this.languages)
    })
    this.isLoading=false
    
  }

}
