import { Injectable } from '@angular/core';
import { LinkOutputQuery } from 'src/app/inventory-management/models/fields/link-output/link-output-query';

@Injectable({
  providedIn: 'root',
})
export class LinkConfigurationEditionService {
  constructor() {}
  /**
   * check if the form data is valid
   * @param link
   * @returns true or false
   */
  validForm(link: LinkOutputQuery) {
    if (!link.label || !link.url) {
      return false;
    }
    return true;
  }
}
