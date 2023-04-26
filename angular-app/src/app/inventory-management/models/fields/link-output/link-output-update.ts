import { extend } from 'jquery';
import { FieldOutputUpdate } from '../field-output-update';

export class LinkOutputUpdate extends FieldOutputUpdate {
  displayName!: string;
  url!: string;
}
