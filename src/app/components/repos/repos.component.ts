import { Component } from '@angular/core';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
})
export class ReposComponent {
  public grids: string[] = 'ThisisaverylongstringISay'.split('');
}
