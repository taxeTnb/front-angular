import { TestBed } from '@angular/core/testing';

import { TaxetnbService } from './taxetnb.service';

describe('TaxetnbService', () => {
  let service: TaxetnbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxetnbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
