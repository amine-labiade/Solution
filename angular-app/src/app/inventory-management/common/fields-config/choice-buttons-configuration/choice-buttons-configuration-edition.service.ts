import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SelectListItemString } from 'src/app/common/select-list-item-string';
import { ChoiceButtonsQuery } from 'src/app/inventory-management/models/fields/choice-buttons/choice-buttons-query';
import { DataRetrievalService } from 'src/app/inventory-management/services/data-retrieval.service';

@Injectable({
  providedIn: 'root',
})
export class ChoiceButtonsConfigurationEditionService {
  constructor(private dataRetrievalService: DataRetrievalService) {}
  /**
   * check if the form data is valid
   * @param choiceButton
   * @returns true or false
   */
  valideFormWithSource(choiceButton: ChoiceButtonsQuery) {
    if (
      !choiceButton.name ||
      !choiceButton.label ||
      !choiceButton.dataSourceId ||
      !choiceButton.defaultValue
    ) {
      return false;
    }
    return true;
  }
  /**
   * check if the form data is valid
   * @param choiceButton
   * @returns true or false
   */
  valideFormSourceless(choiceButton: ChoiceButtonsQuery) {
    if (!choiceButton.name || !choiceButton.label) {
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
