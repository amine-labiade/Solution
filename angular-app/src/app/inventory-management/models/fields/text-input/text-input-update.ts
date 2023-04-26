import { FieldInputUpdate } from '../field-input-update';

export class TextInputUpdate extends FieldInputUpdate {
  textInputType!: string;
  textInputMax!: string;
  textInputMin!: string;
  placeholder!: string;
  validationRegex!: string;
}
