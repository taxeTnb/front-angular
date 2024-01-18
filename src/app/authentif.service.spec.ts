import { TestBed } from '@angular/core/testing';

import { AuthentifService } from './authentif.service';

describe('AuthentifService', () => {
  let service: AuthentifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthentifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
