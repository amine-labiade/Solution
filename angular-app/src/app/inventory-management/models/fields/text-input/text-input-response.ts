import { FieldInputResponse } from '../field-input-response';

export class TextInputResponse extends FieldInputResponse {
  textInputType!: string;
  textInputMax!: string;
  textInputMin!: string;
  placeholder!: string;
  validationRegex!: string;
}
