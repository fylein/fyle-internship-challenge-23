import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainBodyComponent } from './main-body.component';

xdescribe('MainBodyComponent', () => {
  let component: MainBodyComponent;
  let fixture: ComponentFixture<MainBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainBodyComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default search value', () => {
    expect(component.data.searchVal).toEqual('meghasharma0');
  });

  // Add more test cases as needed
});
