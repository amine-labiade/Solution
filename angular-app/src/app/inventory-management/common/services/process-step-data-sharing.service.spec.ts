import { TestBed } from '@angular/core/testing';

import { ProcessStepDataSharingService } from './process-step-data-sharing.service';

describe('ProcessStepDataSharingService', () => {
  let service: ProcessStepDataSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessStepDataSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
