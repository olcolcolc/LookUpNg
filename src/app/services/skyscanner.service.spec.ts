import { TestBed } from '@angular/core/testing';

import { SkyscannerService } from './skyscanner.service';

describe('SkyscannerService', () => {
  let service: SkyscannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkyscannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
