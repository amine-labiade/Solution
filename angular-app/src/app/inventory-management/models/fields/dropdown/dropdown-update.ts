import { FieldInputUpdate } from '../field-input-update';

export class DropdownUpdate extends FieldInputUpdate {
  defaultValue!: string;
  isMultiselect: boolean = false;
  dataSourceId!: string | null;
  options: any[] = [];
}
