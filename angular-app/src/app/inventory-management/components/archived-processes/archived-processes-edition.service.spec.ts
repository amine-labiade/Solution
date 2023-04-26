/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ArchivedProcessesEditionService } from './archived-processes-edition.service';

describe('Service: ArchivedProcessesEdition', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArchivedProcessesEditionService]
    });
  });

  it('should ...', inject([ArchivedProcessesEditionService], (service: ArchivedProcessesEditionService) => {
    expect(service).toBeTruthy();
  }));
});
