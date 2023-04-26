import { TestBed } from '@angular/core/testing';

import { StepEditionService } from './step-edition.service';

describe('StepEditionService', () => {
  let service: StepEditionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepEditionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
