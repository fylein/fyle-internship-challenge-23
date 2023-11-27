import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-error-message-box',
  templateUrl: './error-message-box.component.html',
  styleUrls: ['./error-message-box.component.scss']
})
export class ErrorMessageBoxComponent {

  error : any;
  constructor(private router:ActivatedRoute) {}

  ngOnInit(){

    this.router.paramMap.subscribe((errorMeassge)=>{
      this.error = errorMeassge.get('user');
    });
    
  }

}
