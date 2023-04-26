import { TestBed } from '@angular/core/testing';

import { DateInputConfigurationEditionService } from './date-input-configuration-edition.service';

describe('DateInputConfigurationEditionService', () => {
  let service: DateInputConfigurationEditionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateInputConfigurationEditionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
