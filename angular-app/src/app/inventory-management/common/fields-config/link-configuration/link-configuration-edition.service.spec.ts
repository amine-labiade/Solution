/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LinkConfigurationEditionService } from './link-configuration-edition.service';

describe('Service: LinkConfigurationEdition', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LinkConfigurationEditionService]
    });
  });

  it('should ...', inject([LinkConfigurationEditionService], (service: LinkConfigurationEditionService) => {
    expect(service).toBeTruthy();
  }));
});
