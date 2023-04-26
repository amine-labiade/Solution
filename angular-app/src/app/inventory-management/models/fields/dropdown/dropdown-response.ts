import { FieldInputResponse } from '../field-input-response';

export class DropdownResponse extends FieldInputResponse {
  isMultiselect!: boolean;
  dataSourceId!: string | null;
  options!: any[];
}
