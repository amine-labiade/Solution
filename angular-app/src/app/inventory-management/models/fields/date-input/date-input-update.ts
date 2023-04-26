import { FieldInputUpdate } from '../field-input-update';

export class DateInputUpdate extends FieldInputUpdate {
  minDate!: Date;
  maxDate!: Date;
}
