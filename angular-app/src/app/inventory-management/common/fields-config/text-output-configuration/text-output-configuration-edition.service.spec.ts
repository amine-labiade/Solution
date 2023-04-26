/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TextOutputConfigurationEditionService } from './text-output-configuration-edition.service';

describe('Service: TextOutputConfigurationEdition', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextOutputConfigurationEditionService]
    });
  });

  it('should ...', inject([TextOutputConfigurationEditionService], (service: TextOutputConfigurationEditionService) => {
    expect(service).toBeTruthy();
  }));
});
