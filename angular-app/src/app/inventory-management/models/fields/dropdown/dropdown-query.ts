import { ConfigurationInput } from '../configuration-input';

export class DropdownQuery extends ConfigurationInput {
  defaultValue!: string;
  isMultiselect: boolean = false;
  dataSourceId!: string | null;
  options: any[] = [];
}
