import { ConfigurationInput } from '../configuration-input';

export class TextInputQuery extends ConfigurationInput {
  textInputType!: string;
  textInputMax!: string;
  textInputMin!: string;
  placeholder!: string;
  validationRegex!: string;
}
