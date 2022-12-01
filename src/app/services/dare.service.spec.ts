import { TestBed } from '@angular/core/testing';

import { DareService } from './dare.service';

describe('DareService', () => {
  let service: DareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
