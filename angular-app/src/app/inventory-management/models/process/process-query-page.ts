import { SelectListItem } from 'src/app/common/select-list-item';
import { SelectListItemString } from 'src/app/common/select-list-item-string';
import { ProcessQuery } from './process-query';

export class ProcessQueryPage {
  inventoryTypes: SelectListItem[] = [];
  dataSources!: SelectListItemString[];
  users!: SelectListItem[];
  stateValidationDate!: number;
  isCreationMode = false;
  isEditingMode = false;
}
