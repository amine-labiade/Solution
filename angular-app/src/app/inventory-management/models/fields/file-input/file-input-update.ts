import { FieldInputResponse } from '../field-input-response';
import { FieldInputUpdate } from '../field-input-update';

export class FileInputUpdate extends FieldInputUpdate {
  fileInputtype!: string;
  fileInputExtension!: string;
  minSize!: number;
  maxSize!: number;
}
