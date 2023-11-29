import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading-component',
  templateUrl: './loading-component.component.html',
  styleUrls: ['./loading-component.component.scss']
})
export class LoadingComponentComponent implements OnInit {
  @Input() text!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
