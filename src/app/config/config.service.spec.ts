import { TestBed } from '@angular/core/testing';
// Import the 'TestBed' utility from Angular's testing framework.

import { ConfigService } from './config.service';
// Import the 'ConfigService' class that is being tested.

describe('ConfigService', () => {
  // Define a test suite for the 'ConfigService'.

  let service: ConfigService;
  // Declare a variable 'service' to hold an instance of the 'ConfigService'.

  beforeEach(() => {
    // Define a setup function to run before each test case.

    TestBed.configureTestingModule({});
    // Configure the TestBed module for testing.

    service = TestBed.inject(ConfigService);
    // Create an instance of 'ConfigService' by injecting it from the TestBed.

  });

  it('should be created', () => {
    // Define a test case to check if the service can be created.

    expect(service).toBeTruthy();
    // Use the 'expect' statement to assert that the 'service' instance is truthy (not null or undefined), indicating that the service was successfully created.

  });
});
