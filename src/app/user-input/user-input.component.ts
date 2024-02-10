import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss']
})
export class UserInputComponent {
  @Output() searchUserName = new EventEmitter<string>() 
  userName!: string;

  getUser(){
    this.searchUserName.emit(this.userName);
    // console.log(this.userName);
  }
}
