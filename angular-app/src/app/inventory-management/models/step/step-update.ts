export class StepUpdate {
  id!: string;
  name!: string;
  description!: string;
  previousStepId!: string;
  stepFields: any[] = [];
}
