/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SliderConfigurationEditionService } from './slider-configuration-edition.service';

describe('Service: SliderConfigurationEdition', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SliderConfigurationEditionService]
    });
  });

  it('should ...', inject([SliderConfigurationEditionService], (service: SliderConfigurationEditionService) => {
    expect(service).toBeTruthy();
  }));
});
