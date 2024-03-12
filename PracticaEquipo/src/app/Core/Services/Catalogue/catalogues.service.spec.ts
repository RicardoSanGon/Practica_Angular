import { TestBed } from '@angular/core/testing';

import { CataloguesService } from './catalogues.service';

describe('CataloguesService', () => {
  let service: CataloguesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CataloguesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
