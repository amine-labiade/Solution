import { Constants } from 'src/app/common/constants';
import { FileInputQuery } from './file-input-query';
import { FileInputResponse } from './file-input-response';
import { FileInputUpdate } from './file-input-update';

export class FileInputConfigurationPage {
  fieldConfiguration: FileInputQuery = new FileInputQuery();
  typeFiles: string[] = Constants.typeFiles;
  extensions: string[] = [];
  fieldResponse: FileInputResponse = new FileInputResponse();
  fieldUpdated: FileInputUpdate = new FileInputUpdate();
}
