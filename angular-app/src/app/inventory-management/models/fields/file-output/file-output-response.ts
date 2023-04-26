import { FieldOutputResponse } from '../field-output-response';

export class FileOutputResponse extends FieldOutputResponse {
  fileOutputType!: string;
  fileOutputExtension!: string;
  filePath!: string;
}
