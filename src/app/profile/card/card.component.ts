import { Component, Input } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() url: string = '';
  @Input() name: string = '';
  @Input() desc: string = '';
  @Input() topics: string = '';
}
