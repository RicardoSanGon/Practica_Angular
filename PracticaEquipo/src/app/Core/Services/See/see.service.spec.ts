import { TestBed } from '@angular/core/testing';

import { SeeService } from './see.service';

describe('SeeService', () => {
  let service: SeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
