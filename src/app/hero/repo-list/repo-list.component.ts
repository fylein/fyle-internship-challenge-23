import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent {

  @Input() data:any;
  selected: number = 10;
  currPage:number = 1;
  dropDowns: any[] = [
      { id: 5},
      { id: 10},
      { id: 25},
      { id: 50},
      { id: 100}
    ];

  selectOption(id: any) {
    this.selected=id
  }

}
