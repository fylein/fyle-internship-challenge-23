import { Component, Input } from '@angular/core';
import { Developer } from '../models/Developer';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  @Input() appTitle: string = '';
  @Input() currentYear: number = 0;
  @Input() developer: Developer = {
    name: '',
    githubUrl: '',
  };
}
