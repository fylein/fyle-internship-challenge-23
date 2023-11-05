import { Component, OnInit } from '@angular/core';
import { HomePageService } from "../home-page/home-page.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-listing-component',
  templateUrl: './listing-component.component.html',
  styleUrls: ['./listing-component.component.css']
})
export class ListingComponentComponent implements OnInit {

  gituser:any;
  loaded=false;
  errors=false;
  name: any;
  repos:any;
  orepos:any;
  limit=0;
  count=1
  searchtext;
  usercount=10;
  repo=[1,2,3,4]
  limits=[];
  message=false;
  constructor(private restapi:HomePageService,private route:ActivatedRoute,private router:Router) {
    router.events.subscribe((val) => {
      this.ngOnInit() 
  });
   }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('userName');
    this.restapi.getUserdetails(this.name).subscribe(
      result=>{
        this.gituser=result
        this.restapi.getUserRepo(this.name).subscribe(
          data=>{
            this.orepos=data
            var demo=[];
            for(var i=0;i<this.orepos.length;i++){
              demo.push(this.orepos[i])
            }
            this.orepos = demo
            this.repos = this.orepos.slice(0,this.usercount)
            this.limit = Math.ceil(this.orepos.length/this.usercount)
            this.limits=[]
            for(i=0;i<this.limit;i++){
                this.limits.push(i+1)
            }
            this.errors=false
            this.loaded=true
            // this.limits = this.limits.splice(0,this.limit)
            // console.log(this.limits)
          },err=>{
            console.log(err)
          }
        )
      },error=>{
        console.log(error)
        this.loaded=true
        this.errors=true
        this.limit=0
      }
    )
  }
  next(){
    var min = this.count*this.usercount
    this.count++;
    var max = this.count*this.usercount
    this.repos = this.orepos.slice(min,max)
  }
  previous(){
    this.count--;
    var max=this.count*this.usercount
    var min=this.count-1
    min *=this.usercount
    this.repos = this.orepos.slice(min,max)
  }
  onKeypressEvent(event){
    if(event.charCode == 13 && this.searchtext.length!=0){
      var repos = this.orepos.filter((val) => val.name.toLowerCase().includes(this.searchtext));
      this.limits=[]
      this.repos = repos.slice(0,this.usercount)
      this.limit = Math.ceil(repos.length/this.usercount)
      for(var i=0;i<this.limit;i++){
        this.limits.push(i+1)}
      this.errors=false
      this.loaded=true
      this.count=1
    }
    if(event.charCode == 13 && this.searchtext.length==0){
      this.limits=[]
      this.repos = this.orepos.slice(0,this.usercount)
      this.limit = Math.ceil(this.orepos.length/this.usercount)
      for(var i=0;i<this.limit;i++){
        this.limits.push(i+1)}
      this.errors=false
      this.loaded=true
      this.count=1
    }
  }
  onKey(event){
    
    if(this.searchtext == 0){
      this.limits=[]
      this.limit = Math.ceil(this.orepos.length/this.usercount)
      var max = this.count*this.usercount
      var min = max-this.usercount
      this.repos = this.orepos.slice(min,max)
      for(var i=0;i<this.limit;i++){
        this.limits.push(i+1)
      }
    }
  }

  onKeypressEventpage(event){
    if(event.charCode == 13 && event.target.value!=0 && event.target.value <= 100){
      this.message=false
      this.limits=[]
      this.usercount = event.target.value
      this.repos = this.orepos.slice(0,this.usercount)
      this.limit = Math.ceil(this.orepos.length/this.usercount)
      for(var i=0;i<this.limit;i++){
        this.limits.push(i+1)}
      this.errors=false
      this.loaded=true
      this.count=1
    }
    else{
      this.message=true
    }
  }
  changePage(lt){
    this.count=lt
    var max = this.count*this.usercount
    var min = max-this.usercount
    this.repos=this.orepos.slice(min,max)
  }
}
