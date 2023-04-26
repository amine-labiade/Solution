import { FieldOutputUpdate } from '../field-output-update';

export class FileOutputUpdate extends FieldOutputUpdate {
  fileOutputType!: string;
  fileOutputExtension!: string;
  filePath!: string;
}
