import { Component, Input, OnChanges } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {

    @Input() data:any;
}
