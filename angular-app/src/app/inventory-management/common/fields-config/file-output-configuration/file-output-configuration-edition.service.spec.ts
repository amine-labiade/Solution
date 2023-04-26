/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FileOutputConfigurationEditionService } from './file-output-configuration-edition.service';

describe('Service: FileOutputConfigurationEdition', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileOutputConfigurationEditionService]
    });
  });

  it('should ...', inject([FileOutputConfigurationEditionService], (service: FileOutputConfigurationEditionService) => {
    expect(service).toBeTruthy();
  }));
});
