import { TestBed } from '@angular/core/testing';

import { BoulderService } from './boulder.service';

describe('BoulderServiceService', () => {
  let service: BoulderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoulderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
