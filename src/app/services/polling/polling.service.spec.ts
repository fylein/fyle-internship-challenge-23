import { TestBed } from '@angular/core/testing';

import { PollingService } from './polling.service';

describe('PollingService', () => {
  let service: PollingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PollingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
