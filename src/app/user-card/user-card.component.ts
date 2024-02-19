import { Component, OnDestroy, OnInit } from '@angular/core';
import { user } from '../types';
import { Subscription } from 'rxjs';
import { Store} from '@ngrx/store';
import { appState } from '../state/app.state';
import { loadRepos, toggleLoadingRepos, toggleLoadingUser } from '../state/app.actions';


@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})

export class UserCardComponent implements OnDestroy ,OnInit{

  user !: user
  noOfRepos !: number
  perPage :number = 10
  query:string = ""
  userLoading!:boolean 
  appstateUserObservable !: Subscription
  error = ''
  indexes!:any[]  
  repos !: any[]
  currentPage = 1
  reposLoading!:boolean
  appstateRepoObservable !: Subscription

  skeletonArray:any[] = new Array(15)

  constructor(

    private store:Store<{user:appState,repos:appState}>
    
  ){ 
   
  }


  dataListener($event:{perpage:string,query:string}){
    this.perPage = parseInt($event.perpage)
    this.query = $event.query
  }

  loadReposHandler(){
    this.store.dispatch(toggleLoadingRepos())
    this.store.dispatch(loadRepos({username:this.query,perPage:""+this.perPage,page:""+this.currentPage}))
  }

  setCurrentPage(page:number){
    this.currentPage = page
    this.loadReposHandler()
  }

  previousPage(){
    if(this.currentPage !== 1){
      this.currentPage--
      this.loadReposHandler()
    }
  }

  nextPage(){
    if(this.currentPage !== this.indexes.length){
      this.currentPage++
      this.loadReposHandler()
    }
  }

  ngOnInit(): void {
    this.appstateUserObservable = this.store.select('user').subscribe(data=>{
      this.user = data.user
      this.noOfRepos = this.user.public_repos
      this.userLoading = data.loadingUser
      this.error = data.error
      this.indexes = new Array(Math.ceil(this.noOfRepos/this.perPage))
    })
    

    this.appstateRepoObservable = this.store.select('repos').subscribe(data=>{
      this.repos = data.repos
      this.reposLoading = data.loadingRepos
    })

  }
  
  ngOnDestroy(): void {
    this.appstateRepoObservable.unsubscribe()
    this.appstateUserObservable.unsubscribe()
  }

}