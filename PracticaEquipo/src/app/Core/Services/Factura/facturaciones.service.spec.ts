import { TestBed } from '@angular/core/testing';

import { FacturacionesService } from './facturaciones.service';

describe('FacturacionesService', () => {
  let service: FacturacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
