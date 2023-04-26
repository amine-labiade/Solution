/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProcessDetailsEditionService } from './process-details-edition.service';

describe('Service: ProcessDetailsEdition', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessDetailsEditionService]
    });
  });

  it('should ...', inject([ProcessDetailsEditionService], (service: ProcessDetailsEditionService) => {
    expect(service).toBeTruthy();
  }));
});
