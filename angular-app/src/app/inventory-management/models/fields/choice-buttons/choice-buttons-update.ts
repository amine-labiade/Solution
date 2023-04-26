import { FieldInputUpdate } from '../field-input-update';
import { ChoiceButtonsType } from './choice-buttons-type.enum';

export class ChoiceButtonsUpdate extends FieldInputUpdate {
  choiceButtonsType!: number;
  defaultValue!: string;
  dataSourceId!: string | null;
  options: any[] = [];
}
