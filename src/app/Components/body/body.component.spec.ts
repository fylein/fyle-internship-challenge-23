import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyComponent } from './body.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from './pagination/pagination.component';

describe('BodyComponent', () => {
  let component: BodyComponent;
  let fixture: ComponentFixture<BodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyComponent ,PaginationComponent ],
      imports: [ HttpClientTestingModule,HttpClientModule  ],

    });
    fixture = TestBed.createComponent(BodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
