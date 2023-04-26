/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthentificationEditionService } from './authentification-edition.service';

describe('Service: AuthentificationEdition', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthentificationEditionService]
    });
  });

  it('should ...', inject([AuthentificationEditionService], (service: AuthentificationEditionService) => {
    expect(service).toBeTruthy();
  }));
});
