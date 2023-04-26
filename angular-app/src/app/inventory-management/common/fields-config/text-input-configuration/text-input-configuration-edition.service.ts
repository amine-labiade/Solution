import { Injectable } from '@angular/core';
import { Constants } from 'src/app/common/constants';
import { StateOfValidationForm } from 'src/app/common/state-of-validation-form.enum';
import { TextInputQuery } from 'src/app/inventory-management/models/fields/text-input/text-input-query';

@Injectable({
  providedIn: 'root',
})
export class TextInputConfigurationEditionService {
  constructor() {}

  /**
   * check if the form data is valid
   * @param textInput
   * @returns state enum
   */
  validForm(textInput: TextInputQuery) {
    if (!textInput.label || !textInput.name || !textInput.textInputType) {
      return StateOfValidationForm.empty;
    }
    if (textInput.textInputMin && textInput.textInputMax) {
      if (
        textInput.textInputType === Constants.type_inputs_en.text ||
        textInput.textInputType === Constants.type_inputs_en.password ||
        textInput.textInputType === Constants.type_inputs_en.phone_number ||
        textInput.textInputType === Constants.type_inputs_en.number
      ) {
        let minConvertToNumber = Number(textInput.textInputMin);
        let maxConvertToNumber = Number(textInput.textInputMax);
        if (minConvertToNumber >= maxConvertToNumber) {
          return StateOfValidationForm.minMaxNotValid;
        }
      } else {
        let minConvertToDate = new Date(textInput.textInputMin);
        let maxConvertToDate = new Date(textInput.textInputMax);
        if (minConvertToDate >= maxConvertToDate) {
          return StateOfValidationForm.minMaxDateNotValid;
        }
      }
    }
    return StateOfValidationForm.valid;
  }
}
