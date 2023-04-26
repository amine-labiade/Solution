import { TextOutputQuery } from './text-output-query';
import { TextOutputResponse } from './text-output-response';
import { TextOutputUpdate } from './text-output-update';

export class TextOutputConfigurationPage {
  fieldConfiguration: TextOutputQuery = new TextOutputQuery();
  fieldResponse: TextOutputResponse = new TextOutputResponse();
  fieldUpdated: TextOutputUpdate = new TextOutputUpdate();
}
