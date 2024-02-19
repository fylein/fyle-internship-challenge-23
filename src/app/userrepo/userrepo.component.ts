import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-userrepo',
  templateUrl: './userrepo.component.html',
  styleUrls: ['./userrepo.component.scss']
})
export class UserrepoComponent {
  @Input() userRepo: any;
  ngOnChanges() {
      // console.log(this.userRepo);
  }
}
