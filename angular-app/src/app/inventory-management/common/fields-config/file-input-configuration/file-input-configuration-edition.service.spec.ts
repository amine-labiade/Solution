/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FileInputConfigurationEditionService } from './file-input-configuration-edition.service';

describe('Service: FileInputConfigurationEdition', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileInputConfigurationEditionService]
    });
  });

  it('should ...', inject([FileInputConfigurationEditionService], (service: FileInputConfigurationEditionService) => {
    expect(service).toBeTruthy();
  }));
});
