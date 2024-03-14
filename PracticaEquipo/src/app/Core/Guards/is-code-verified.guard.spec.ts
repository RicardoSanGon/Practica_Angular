import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isCodeVerifiedGuard } from './is-code-verified.guard';

describe('isCodeVerifiedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isCodeVerifiedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
