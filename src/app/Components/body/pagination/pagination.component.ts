import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  perPage:number = 10 
  page: number =1
  total: number = 0
  totalPages:number =0
  lastDigit:number =0
  limit:number = 3
  repos =[]

  results = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5}
];

  constructor(private apiService: ApiService){}

  ngOnInit(){
    this.total = this.apiService.total
    this.totalPages = (this.total%this.perPage===0)?this.total/this.perPage: Math.floor(this.total/this.perPage)+1
    this.limit = this.limit>=this.totalPages?this.totalPages:3
    
  }


  handler = (val:string)=>{
    if(val==='Previous' && this.lastDigit>=3)
     { this.limit=3
      this.lastDigit=this.lastDigit-3}

    else if(val==='Next' && this.lastDigit+3<this.totalPages)
      {this.limit = (this.totalPages-(this.lastDigit+3))>3?3:(this.totalPages-(this.lastDigit+3))
      this.lastDigit=this.lastDigit+3}
    
  }
  onChange(element:any){
   this.perPage = element.target.value
   this.total = this.apiService.total
   this.totalPages = (this.total%this.perPage===0)?this.total/this.perPage: Math.floor(this.total/this.perPage)+1
   this.limit = this.limit>=this.totalPages?this.totalPages:3
  }

  fetchPageination= (page:number)=>{
    if(this.apiService.apiResults[this.apiService.searchVal+this.perPage+page]){
      console.log('api cancelled')
      this.repos = this.apiService.apiResults[this.apiService.searchVal+this.perPage+page]
      this.apiService.setRepos(this.repos)
      return
    }
      this.apiService.getRepos(this.apiService.searchVal ,{per_page:this.perPage,page:page}).subscribe((response :any)=>{
      this.repos = response
      this.apiService.setRepos(this.repos)
      this.apiService.apiResults[this.apiService.searchVal+this.perPage+page] = response
    })
  }
}
