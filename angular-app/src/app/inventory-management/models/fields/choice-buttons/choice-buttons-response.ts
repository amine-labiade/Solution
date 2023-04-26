import { FieldInputResponse } from '../field-input-response';

export class ChoiceButtonsResponse extends FieldInputResponse {
  dataSourceId!: string | null;
  options: any[] = [];
}
