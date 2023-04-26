import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProcessDetail } from '../../models/process/process-detail';
import { ProcessToDisplay } from '../../models/process/process-to-display';
import { ProcessPage } from '../../models/process/process-page';
import { ProcessResponse } from '../../models/process/process-response';

import { StepResponse } from '../../models/step/step-response';

@Injectable({
  providedIn: 'root',
})
export class ProcessStepDataSharingService {
  manipulatedStep: StepResponse = {
    id: '',
    name: '',
    description: '',
    creationDate: '',
  };
  processSteps: Array<StepResponse> = [];
  subscription!: Subscription;
  processToStore: ProcessToDisplay = new ProcessToDisplay();
  processDetailsToStore: ProcessDetail = new ProcessDetail();

  private manipulatedStepSource = new BehaviorSubject(this.manipulatedStep);
  private processToStoreSource = new BehaviorSubject(this.processToStore);
  private processStepsSource = new BehaviorSubject(this.processSteps);
  private processDetailsToStoreSource = new BehaviorSubject(
    this.processDetailsToStore
  );

  activeStep = this.manipulatedStepSource.asObservable();
  currentProcessSteps = this.processStepsSource.asObservable();
  currentProcessDetails = this.processDetailsToStoreSource.asObservable();
  currentProcess = this.processToStoreSource.asObservable();

  constructor() {}

  /**
   * Used to keep step up to date
   * @param step
   */
  updateStep(step: StepResponse) {
    this.manipulatedStepSource.next(step);
  }

  /**
   * Used to store the process details
   */
  updateLocalProcessDetails(processToStore: ProcessDetail) {
    this.processDetailsToStoreSource.next(processToStore);
  }

  /**
   * Used to store the process being created so that it's passed back and forth between relevant components
   */
  updateLocalProcess(processToStore: ProcessToDisplay) {
    this.processToStoreSource.next(processToStore);
  }
  /**
   * Used to keep the array of a process up to date when creating new process steps
   * @param processSteps array of steps in the process being created/modified
   */
  updateProcessSteps(processSteps: StepResponse[]) {
    this.processStepsSource.next(processSteps);
  }
}
