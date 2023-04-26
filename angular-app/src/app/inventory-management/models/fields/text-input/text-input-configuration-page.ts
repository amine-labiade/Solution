import { Constants } from 'src/app/common/constants';
import { TextInputQuery } from './text-input-query';
import { TextInputResponse } from './text-input-response';
import { TextInputUpdate } from './text-input-update';

export class TextInputConfigurationPage {
  fieldConfiguration: TextInputQuery = new TextInputQuery();
  typeInputs: string[] = Constants.typeInputs;
  validationRegex: string[] = Constants.validationRegex;
  fieldResponse: TextInputResponse = new TextInputResponse();
  fieldUpdated: TextInputUpdate = new TextInputUpdate();
}
