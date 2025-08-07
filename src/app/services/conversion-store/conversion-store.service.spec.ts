import { TestBed } from '@angular/core/testing';

import { ConversionStoreService } from './conversion-store.service';

describe('ConversionStoreService', () => {
  let service: ConversionStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversionStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
