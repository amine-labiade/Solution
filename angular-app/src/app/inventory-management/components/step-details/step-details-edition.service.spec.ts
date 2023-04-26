/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StepDetailsEditionService } from './step-details-edition.service';

describe('Service: StepDetailsEdition', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StepDetailsEditionService]
    });
  });

  it('should ...', inject([StepDetailsEditionService], (service: StepDetailsEditionService) => {
    expect(service).toBeTruthy();
  }));
});
