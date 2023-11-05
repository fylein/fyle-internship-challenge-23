// Import the necessary module from '@angular/core/testing'.
import { TestBed } from '@angular/core/testing';

// Import the 'HomePageService' class from the 'home-page.service' file.
import { HomePageService } from './home-page.service';

// This 'describe' block defines a test suite for the 'HomePageService'.
describe('HomePageService', () => {
  let service: HomePageService; // Declare a variable to hold an instance of the 'HomePageService'.

  // This 'beforeEach' block is used to configure and create the service instance before each test.
  beforeEach(() => {
    TestBed.configureTestingModule({}); // Configure the testing module for this service.
    service = TestBed.inject(HomePageService); // Create an instance of 'HomePageService' using dependency injection.
  });

  // This 'it' block defines a test case that checks if the 'HomePageService' was created successfully.
  it('should be created', () => {
    expect(service).toBeTruthy(); // Expect that the 'service' is truthy, indicating that it was successfully created.
  });
});
