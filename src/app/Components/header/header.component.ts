import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private apiService: ApiService){
    
  }
  value = ''
  result = {}
  repos =[]

  handler = ()=>{ 
    this.apiService.setSearchVal(this.value)

    this.apiService.getUser(this.value).subscribe((response :any)=>{
      this.result=response
    // console.log(this.result)
    this.apiService.setUser(this.result)  
  });

    this.apiService.getRepos(this.value,{per_page:10,page:1}).subscribe((response :any)=>{
      this.repos = response
      this.apiService.setRepos(this.repos)
    })
  }
}
