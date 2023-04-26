/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TextInputConfigurationEditionService } from './text-input-configuration-edition.service';

describe('Service: TextInputConfigurationEdition', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextInputConfigurationEditionService]
    });
  });

  it('should ...', inject([TextInputConfigurationEditionService], (service: TextInputConfigurationEditionService) => {
    expect(service).toBeTruthy();
  }));
});
