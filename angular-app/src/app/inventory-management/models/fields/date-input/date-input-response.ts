import { FieldInputResponse } from '../field-input-response';

export class DateInputResponse extends FieldInputResponse {
  minDate!: Date;
  maxDate!: Date;
}
