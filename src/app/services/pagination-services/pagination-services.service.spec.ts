import { TestBed } from '@angular/core/testing';

import { PaginationService } from './pagination-services.service';

describe('PaginationServicesService', () => {
  let service: PaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
