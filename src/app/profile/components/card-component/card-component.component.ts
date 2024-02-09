import { Component, Input } from '@angular/core';

@Component({
  selector: 'card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.scss']
})
export class CardComponent {
  @Input() url: string = '';
  @Input() name: string = '';
  @Input() desc: string = '';
  @Input() topics: string = '';
}
