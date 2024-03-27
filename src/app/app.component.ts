import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  notFoundError:boolean=false;
  showLoading:boolean=false;

  user: any;

  pageSizes: number[] = [10, 20, 30, 40, 50,80,100];

  allUserRepo:any;
  currentRepoPage:number=1;
  repoPerPage:number=10;


  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {

    this.showLoading=true;


    this.apiService.getUser('johnpapa').subscribe((data:any)=>{
      console.log(data);
      this.user=data;

      this.notFoundError=false;

      this.apiService.getAllRepo(this.user.login).subscribe((data:any)=>{
        console.log(data);
        this.allUserRepo=data;
        this.notFoundError=false;
        this.showLoading=false;


      },error=>{
        this.notFoundError=true;
        this.showLoading=false;
      });

    },error=>{
      this.notFoundError=true;
      this.showLoading=false;

    });

  }
  onSearch(input:string){ 
    this.showLoading=true;

    console.log(input);
    this.apiService.getUser(input).subscribe((data:any)=>{
      console.log(data);
      this.user=data;
      this.notFoundError=false;

      this.apiService.getAllRepo(this.user.login).subscribe((data:any)=>{
        console.log(data);
        this.allUserRepo=data;
        this.notFoundError=false;
        this.showLoading=false;

      },error=>{
        this.notFoundError=true;
        this.showLoading=false;

      });

    },error=>{
      this.notFoundError=true;
      this.showLoading=false;

    });
  }
  pageChanged(page:any){
    this.currentRepoPage=page;
  }
}
