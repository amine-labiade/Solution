/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FieldService } from './field.service';

describe('Service: Field', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FieldService]
    });
  });

  it('should ...', inject([FieldService], (service: FieldService) => {
    expect(service).toBeTruthy();
  }));
});
