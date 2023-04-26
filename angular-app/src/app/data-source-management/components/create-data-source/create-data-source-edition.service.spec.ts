/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CreateDataSourceEditionService } from './create-data-source-edition.service';

describe('Service: CreateDataSourceEdition', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateDataSourceEditionService]
    });
  });

  it('should ...', inject([CreateDataSourceEditionService], (service: CreateDataSourceEditionService) => {
    expect(service).toBeTruthy();
  }));
});
