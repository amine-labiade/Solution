import { Injectable } from '@angular/core';
import { TextOutputQuery } from 'src/app/inventory-management/models/fields/text-output/text-output-query';

@Injectable({
  providedIn: 'root',
})
export class TextOutputConfigurationEditionService {
  constructor() {}

  /**
   * check if the form data is valid
   * @param text
   * @returns true or false
   */
  validForm(text: TextOutputQuery) {
    if (!text.label || !text.value) {
      return false;
    }

    return true;
  }
}
