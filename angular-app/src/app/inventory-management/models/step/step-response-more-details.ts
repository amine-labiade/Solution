import { FieldResponse } from '../fields/field-response';

export class StepResponseMoreDetails {
  name!: string;
  description!: string;
  creationDate!: Date;
  nextStepName!: string;
  previousStepName!: string;
  fieldsCount!: number;
  stepFields: FieldResponse[] = [];
}
