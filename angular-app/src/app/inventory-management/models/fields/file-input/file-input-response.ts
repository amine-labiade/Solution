import { FieldInputResponse } from '../field-input-response';

export class FileInputResponse extends FieldInputResponse {
  fileInputtype!: string;
  fileInputExtension!: string;
  minSize!: number;
  maxSize!: number;
}
