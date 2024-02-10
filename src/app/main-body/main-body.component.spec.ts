import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MainBodyComponent } from './main-body.component';
import { DebugElement } from '@angular/core';

describe('MainBodyComponent', () => {
  let component: MainBodyComponent;
  let fixture: ComponentFixture<MainBodyComponent>;
  let el: DebugElement;
  let httpTestingController: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MainBodyComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(MainBodyComponent);
      el = fixture.debugElement;
      component = fixture.componentInstance;
      httpTestingController = TestBed.inject(HttpTestingController);
    });
  })
  )

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
