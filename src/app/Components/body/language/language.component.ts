import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent {

  @Input() repo : string =''
  lan:string[] =[]

  constructor(private apiService: ApiService){}

  ngOnInit(){
    console.log(this.repo)
    this.apiService.getLanguages(this.apiService.searchVal , this.repo).subscribe((res:any)=>{
      this.lan = Object.keys(res)
    })
  }


}
