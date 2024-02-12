// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { PaginationComponent } from './pagination.component';

// xdescribe('PaginationComponent', () => {
//   // let component: PaginationComponent;
//   // let fixture: ComponentFixture<PaginationComponent>;

//   // beforeEach(() => {
//   //   TestBed.configureTestingModule({
//   //     declarations: [PaginationComponent]
//   //   });
//   //   fixture = TestBed.createComponent(PaginationComponent);
//   //   component = fixture.componentInstance;
//   //   fixture.detectChanges();
//   // });

//   // it('should create', () => {
//   //   expect(component).toBeTruthy();
//   // });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

xdescribe('MainBodyComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Add more test cases as needed
});

