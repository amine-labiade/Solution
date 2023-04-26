import { SelectListItemString } from 'src/app/common/select-list-item-string';
import { DropdownQuery } from './dropdown-query';
import { DropdownResponse } from './dropdown-response';
import { DropdownUpdate } from './dropdown-update';

export class DropdownConfigurationPage {
  selectedValueRadio: string = 'withSource';
  dataSources: SelectListItemString[] = [];
  fieldConfiguration: DropdownQuery = new DropdownQuery();
  fieldResponse: DropdownResponse = new DropdownResponse();
  fieldUpdated: DropdownUpdate = new DropdownUpdate();
  optionsFromApi: SelectListItemString[] = [];
  defaultValue: any;
}
