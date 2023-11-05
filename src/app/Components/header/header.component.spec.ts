// Import necessary modules from '@angular/core/testing'.
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Import the 'HeaderComponent' class from the 'header.component' file.
import { HeaderComponent } from './header.component';

// This 'describe' block defines a test suite for the 'HeaderComponent'.
describe('HeaderComponent', () => {
  let component: HeaderComponent; // Declare a variable to hold an instance of the 'HeaderComponent'.
  let fixture: ComponentFixture<HeaderComponent>; // Declare a variable to hold a fixture for the 'HeaderComponent'.

  // This 'beforeEach' block is wrapped in the 'async' function.
  // It configures and compiles the Angular module before each test.
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ] // Declare the component to be tested, 'HeaderComponent'.
    })
    .compileComponents(); // Compile the component for testing.
  }));

  // This 'beforeEach' block is used to create an instance of the 'HeaderComponent' and detect changes.
  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent); // Create a fixture for the 'HeaderComponent'.
    component = fixture.componentInstance; // Create an instance of the 'HeaderComponent'.
    fixture.detectChanges(); // Detect changes in the component.
  });

  // This 'it' block defines a test case that checks if the 'HeaderComponent' was created successfully.
  it('should create', () => {
    expect(component).toBeTruthy(); // Expect that the 'component' is truthy, indicating that it was successfully created.
  });
});
