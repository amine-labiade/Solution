export class StepResponse {
  id!: string;
  name!: string;
  description!: string;
  creationDate!: string;
  previousStepId?: string;
  previousStepName?: string;
  nextStepId?: string | null;
  nextInventoryStepName?: string | null;
}
