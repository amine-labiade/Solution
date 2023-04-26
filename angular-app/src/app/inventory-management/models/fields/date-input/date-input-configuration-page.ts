import { DateInputQuery } from './date-input-query';
import { DateInputResponse } from './date-input-response';
import { DateInputUpdate } from './date-input-update';

export class DateInputConfigurationPage {
  fieldConfiguration: DateInputQuery = new DateInputQuery();
  fieldResponse: DateInputResponse = new DateInputResponse();
  fieldUpdated: DateInputUpdate = new DateInputUpdate();
}
