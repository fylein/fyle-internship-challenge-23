import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnChanges{
  @Input() userData: any;
  @Input() loading!: boolean;
  constructor() {
  }

  ngOnChanges() {
    console.log(this.userData);
  }

}
