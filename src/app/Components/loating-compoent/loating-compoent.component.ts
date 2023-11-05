import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loating-compoent',
  templateUrl: './loating-compoent.component.html',
  styleUrls: ['./loating-compoent.component.css']
})
export class LoatingCompoentComponent implements OnInit {
  repo=[1,2,3,4]
  constructor() { }

  ngOnInit(): void {
  }

}
