import { Component, OnInit, Input } from '@angular/core';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-error-component',
  templateUrl: './error-component.component.html',
  styleUrls: ['./error-component.component.css']
})
export class ErrorComponentComponent implements OnInit {

  @Input() error!: string;

  errorIcon = faExclamation;

  constructor() { }

  ngOnInit(): void {
  }

}
