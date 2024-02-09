import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private selectedPerPageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(10);
  private selectedCurrentPageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  getSelectedPerPage(): Observable<number> {
    return this.selectedPerPageSubject.asObservable();
  }

  setSelectedPerPage(value: number): void {
    this.selectedPerPageSubject.next(value);
  }

  getSelectedCurrentPage(): Observable<number> {
    return this.selectedCurrentPageSubject.asObservable();
  }

  setSelectedCurrentPage(value: number): void {
    this.selectedCurrentPageSubject.next(value);
  }
}
