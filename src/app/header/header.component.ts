import { Component,EventEmitter,Output } from '@angular/core';
import { SharedDataService } from '../shared/shared-data.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private sharedData: SharedDataService){}
  
  searchUser(userName:string){
    this.sharedData.updateSearchedUser(userName);
  }

  

}
