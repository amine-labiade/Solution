import { Injectable } from '@angular/core';
import { StateOfValidationForm } from 'src/app/common/state-of-validation-form.enum';
import { DateInputQuery } from 'src/app/inventory-management/models/fields/date-input/date-input-query';

@Injectable({
  providedIn: 'root'
})
export class DateInputConfigurationEditionService {

  constructor() { }

  /**
   * check if the form data is valid
   * @param dateInput
   * @returns stat enum
   */
     validForm(dateInput: DateInputQuery) {
      if (!dateInput.label || !dateInput.name || !dateInput.minDate || !dateInput.maxDate) {
        return StateOfValidationForm.empty;
      }
      if (dateInput.minDate) {
        if (dateInput.minDate >= dateInput.maxDate) {
          return StateOfValidationForm.minMaxNotValid;
        }
      }
      return StateOfValidationForm.valid;
    }
}
