
import { Component, Input, EventEmitter, NgModule, Output } from '@angular/core';

  
@Component({
  selector: 'app-userrepos',
  templateUrl: './userrepos.component.html',
  styleUrls: ['./userrepos.component.scss']
})
export class UserreposComponent {
  @Input() userRepos: any;
  @Input() pageNo!: number ;
  @Input() pageSize!: number;
  @Input() userData: any;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageSizeChange: EventEmitter<number> = new EventEmitter<number>();
  constructor() {
    this.userRepos = [];
    this.pageNo = 1;
    this.pageSize = 10;
    this.userData = {};
  }
  Next(): void {
    if (this.pageNo <= Math.ceil(this.userData.public_repos / this.pageSize)) {
      this.pageNo++;
      this.emitPageChange(this.pageNo);
    }
  }
  Previous():void {
    if (this.pageNo > 1) {
      this.pageNo--;
      this.emitPageChange(this.pageNo);
    }
  }

  goToPage(n: number): void {
    this.pageNo = n;
    this.emitPageChange(this.pageNo);
  }

  emitPageChange(page: number) {
    this.pageChange.emit(page);
  }

  emitPageSizeChange(event: Event) {
    this.emitPageChange(1);
    const value= (event.target as HTMLSelectElement).value;
    this.pageSizeChange.emit(parseInt(value, 10));
  }
  calcCeil(number: number): number {
    return Math.ceil(number);
  }
  ngOnChanges() {
    console.log(this.pageNo)
    console.log(this.userRepos);
  }
}
