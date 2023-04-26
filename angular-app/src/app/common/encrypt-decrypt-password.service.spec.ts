/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EncryptDecryptPasswordService } from './encrypt-decrypt-password.service';

describe('Service: EncryptDecryptPassword', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EncryptDecryptPasswordService]
    });
  });

  it('should ...', inject([EncryptDecryptPasswordService], (service: EncryptDecryptPasswordService) => {
    expect(service).toBeTruthy();
  }));
});
