import { ConfigurationInput } from '../configuration-input';
import { ChoiceButtonsType } from './choice-buttons-type.enum';

export class ChoiceButtonsQuery extends ConfigurationInput {
  choiceButtonsType!: number;
  defaultValue!: string;
  dataSourceId!: string | null;
  options: any[] = [];
}
