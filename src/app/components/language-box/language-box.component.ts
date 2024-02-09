import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-language-box',
  templateUrl: './language-box.component.html',
  styleUrls: ['./language-box.component.scss']
})
export class LanguageBoxComponent {
  @Input() language=''
}
