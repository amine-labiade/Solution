import { Injectable } from '@angular/core';
import { StateOfValidationForm } from 'src/app/common/state-of-validation-form.enum';
import { FileInputQuery } from 'src/app/inventory-management/models/fields/file-input/file-input-query';

@Injectable({
  providedIn: 'root',
})
export class FileInputConfigurationEditionService {
  constructor() {}

  /**
   * check if the form data is valid
   * @param file
   * @returns state enum
   */
  validForm(file: FileInputQuery) {
    if (!file.label || !file.name || !file.fileInputExtension || !file.fileInputtype) {
      return StateOfValidationForm.empty;
    }
    if (file.minSize > file.maxSize) {
      return StateOfValidationForm.minMaxNotValid;
    }
    return StateOfValidationForm.valid;
  }
}
