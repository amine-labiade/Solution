/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DropdownConfigurationEditionService } from './dropdown-configuration-edition.service';

describe('Service: DropdownConfigurationEdition', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DropdownConfigurationEditionService]
    });
  });

  it('should ...', inject([DropdownConfigurationEditionService], (service: DropdownConfigurationEditionService) => {
    expect(service).toBeTruthy();
  }));
});
