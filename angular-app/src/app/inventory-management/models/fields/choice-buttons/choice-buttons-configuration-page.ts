import { SelectListItemString } from 'src/app/common/select-list-item-string';
import { ChoiceButtonsQuery } from './choice-buttons-query';
import { ChoiceButtonsResponse } from './choice-buttons-response';
import { ChoiceButtonsUpdate } from './choice-buttons-update';

export class ChoiceButtonsConfigurationPage {
  selectedValueRadio: string = 'withSource';
  dataSources: SelectListItemString[] = [];
  fieldConfiguration: ChoiceButtonsQuery = new ChoiceButtonsQuery();
  fieldResponse: ChoiceButtonsResponse = new ChoiceButtonsResponse();
  fieldUpdated: ChoiceButtonsUpdate = new ChoiceButtonsUpdate();
  optionsFromApi: SelectListItemString[] = [];
  defaultValue: any;
}
