import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss']
})
export class InputBoxComponent {

  @Output() getFormData = new EventEmitter<String>()

}
