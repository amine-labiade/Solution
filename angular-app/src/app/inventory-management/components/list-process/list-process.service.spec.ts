import { TestBed } from '@angular/core/testing';

import { ListProcessService } from './list-process.service';

describe('ListProcessService', () => {
  let service: ListProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
