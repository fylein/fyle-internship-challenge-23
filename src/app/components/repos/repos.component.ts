import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
})
export class ReposComponent implements OnInit {
  public grids: string[] = 'netwothree'.split('');
  public isSm: boolean = false;

  @HostListener('window:resize', ['$evt'])
  onResize(evt: Event): void {
    this.checkScreenSize();
  }
  private checkScreenSize() {
    const width = window.innerWidth;
    this.isSm = width <= 768;
  }
  ngOnInit() {
    this.checkScreenSize();
  }
}
