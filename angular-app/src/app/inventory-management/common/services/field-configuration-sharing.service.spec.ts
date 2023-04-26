import { TestBed } from '@angular/core/testing';

import { FieldConfigurationSharingService } from './field-configuration-sharing.service';

describe('FieldConfigurationSharingService', () => {
  let service: FieldConfigurationSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldConfigurationSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
