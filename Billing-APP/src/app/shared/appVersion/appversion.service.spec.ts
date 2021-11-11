import { TestBed } from '@angular/core/testing';

import { AppversionService } from './appversion.service';

describe('AppversionService', () => {
  let service: AppversionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppversionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
