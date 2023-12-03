import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  private clickSource = new Subject<any>();
  click$ = this.clickSource.asObservable();

  emitClick(eventData: any) {
    this.clickSource.next({data: eventData});
  }

}
