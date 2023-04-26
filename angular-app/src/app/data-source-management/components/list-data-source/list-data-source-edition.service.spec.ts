/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ListDataSourceEditionService } from './list-data-source-edition.service';

describe('Service: ListDataSourceEdition', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListDataSourceEditionService]
    });
  });

  it('should ...', inject([ListDataSourceEditionService], (service: ListDataSourceEditionService) => {
    expect(service).toBeTruthy();
  }));
});
