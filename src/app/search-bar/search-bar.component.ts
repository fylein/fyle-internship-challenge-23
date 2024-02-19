import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadRepos, loadUser, removeError, toggleLoadingRepos, toggleLoadingUser } from '../state/app.actions';
import { appState } from '../state/app.state';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent {

  @Output() dataEmitter = new EventEmitter<{perpage:string,query:string}>()
  @Output() currentPageEmitter = new EventEmitter<number>()
  query : string = ""
  perpage : string = "10"

  constructor(
      private store : Store<{repos:appState}>
    ){

  }
  setPerpage(perpage:string){
    this.perpage = perpage
  }

  search(){
    if(this.query.trim() !== ""){
      this.store.dispatch(removeError())
      this.store.dispatch(toggleLoadingUser())
      this.store.dispatch(toggleLoadingRepos())
      this.store.dispatch(loadUser({query:this.query}))
      this.store.dispatch(loadRepos({username:this.query,page:"1",perPage:this.perpage}))
      
      this.dataEmitter.emit({query:this.query,perpage:this.perpage})
      this.currentPageEmitter.emit(1)
    }
    
  }
}
