import { TestBed } from '@angular/core/testing';

import { ElectryService } from './electry.service';

describe('ElectryService', () => {
  let service: ElectryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
