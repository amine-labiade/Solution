/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FieldDetailsEditionService } from './field-details-edition.service';

describe('Service: FieldDetailsEdition', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FieldDetailsEditionService]
    });
  });

  it('should ...', inject([FieldDetailsEditionService], (service: FieldDetailsEditionService) => {
    expect(service).toBeTruthy();
  }));
});
