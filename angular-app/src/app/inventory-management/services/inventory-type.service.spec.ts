/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InventoryTypeService } from './inventory-type.service';

describe('Service: InventoryType', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InventoryTypeService]
    });
  });

  it('should ...', inject([InventoryTypeService], (service: InventoryTypeService) => {
    expect(service).toBeTruthy();
  }));
});
