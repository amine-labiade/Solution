import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SelectListItemString } from 'src/app/common/select-list-item-string';
import { DropdownQuery } from 'src/app/inventory-management/models/fields/dropdown/dropdown-query';
import { DataRetrievalService } from 'src/app/inventory-management/services/data-retrieval.service';

@Injectable({
  providedIn: 'root',
})
export class DropdownConfigurationEditionService {
  constructor(private dataRetrievalService: DataRetrievalService) {}

  /**
   * check if the form data is valid
   * @param dropdown
   * @returns true or false
   */
  valideFormWithSource(dropdown: DropdownQuery) {
    if (
      !dropdown.name ||
      !dropdown.label ||
      !dropdown.dataSourceId ||
      !dropdown.defaultValue
    ) {
      return false;
    }
    return true;
  }
  /**
   * check if the form data is valid
   * @param dropdown
   * @returns true or false
   */
  valideFormSourceless(dropdown: DropdownQuery) {
    if (!dropdown.name || !dropdown.label) {
      return false;
    }
    return true;
  }

  /**
   * retrieves data for multiple choice buttons and dropdowns
   * @param id identifier of data source
   * @returns
   */
  async retrieveData(id: string): Promise<SelectListItemString[]> {
    let result = await lastValueFrom(
      this.dataRetrievalService.retrieveData(id)
    );
    return result;
  }
}
