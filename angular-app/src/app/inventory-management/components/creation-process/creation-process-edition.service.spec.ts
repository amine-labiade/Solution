/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CreationProcessEditionService } from './creation-process-edition.service';

describe('Service: CreationProcessEdition', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreationProcessEditionService]
    });
  });

  it('should ...', inject([CreationProcessEditionService], (service: CreationProcessEditionService) => {
    expect(service).toBeTruthy();
  }));
});
