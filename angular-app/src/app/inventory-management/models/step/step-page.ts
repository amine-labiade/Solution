import { Subscription } from 'rxjs';
import { FieldConfiguration } from '../../common/models/field-configuration';
import { StepQuery } from './step-query';
import { StepResponse } from './step-response';
import { StepToDisplay } from './step-to-display';
import { StepUpdate } from './step-update';

export class StepPage {
  stepQuery: StepQuery = new StepQuery();
  idStepToGet!: string;
  idProcessToGet!: string;
  stepToDisplay: StepToDisplay = new StepToDisplay();
  stepUpdate: StepUpdate = new StepUpdate();
  processSteps: StepResponse[] = [];
  possiblePreviousSteps: StepResponse[] = [];
  possiblePreviousStepsFromBack: StepResponse[] = [];
  possiblePreviousStepsTotal: StepResponse[] = [];
  subscription!: Subscription;
  creationMode!: boolean;
  creationProcessMode!: boolean;
  currentConfiguration!: FieldConfiguration;
  selectedPreviousStep: StepResponse = new StepResponse();
}
