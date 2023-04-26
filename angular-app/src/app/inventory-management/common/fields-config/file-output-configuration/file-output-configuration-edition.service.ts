import { Injectable } from '@angular/core';
import { FileOutputQuery } from 'src/app/inventory-management/models/fields/file-output/file-output-query';

@Injectable({
  providedIn: 'root',
})
export class FileOutputConfigurationEditionService {
  constructor() {}

  /**
   * check if the form data is valid
   * @param fileOutput
   * @returns true or false
   */
  validFormSourceless(fileOutput: FileOutputQuery) {
    if (
      !fileOutput.label ||
      !fileOutput.fileOutputType ||
      !fileOutput.filePath ||
      !fileOutput.fileOutputExtension
    ) {
      return false;
    }
    return true;
  }
}
