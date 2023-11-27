import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-card',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit{
  @Input() repo: any;
  constructor() { }
  ngOnInit(): void {
  }
}

