import { Constants } from 'src/app/common/constants';
import { SelectListItemString } from 'src/app/common/select-list-item-string';
import { FieldOutputResponse } from '../field-output-response';
import { FileOutputQuery } from './file-output-query';
import { FileOutputResponse } from './file-output-response';
import { FileOutputUpdate } from './file-output-update';

export class FileOutputConfigurationPage {
  dataSources: SelectListItemString[] = [];
  typeFiles: string[] = Constants.typeFiles;
  extensions: string[] = [];
  fieldConfiguration: FileOutputQuery = new FileOutputQuery();
  fieldResponse: FileOutputResponse = new FileOutputResponse();
  fieldUpdated: FileOutputUpdate = new FileOutputUpdate();
}
