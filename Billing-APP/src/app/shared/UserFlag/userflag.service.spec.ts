import { TestBed } from '@angular/core/testing';

import { UserflagService } from './userflag.service';

describe('UserflagService', () => {
  let service: UserflagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserflagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
