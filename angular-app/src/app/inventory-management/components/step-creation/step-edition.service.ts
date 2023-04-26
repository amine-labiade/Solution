import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { StepPage } from '../../models/step/step-page';
import { StepQuery } from '../../models/step/step-query';
import { StepUpdate } from '../../models/step/step-update';
import { StepService } from '../../services/step.service';

@Injectable({
  providedIn: 'root',
})
export class StepEditionService {
  constructor(private stepService: StepService) {}

  async addStep(stepQuery: StepQuery): Promise<string> {
    return await lastValueFrom(this.stepService.createNewStep(stepQuery));
  }

  /**
   * get details of step from backend
   * @param id
   * @returns step
   */
  async getStepById(id: string): Promise<any> {
    return await lastValueFrom(this.stepService.getStepById(id));
  }

  /**
   * get steps without next from backend
   * @param idProcess
   * @param idStep
   * @returns steps without next
   */
  async getStepsWithoutNext(
    idProcess: string,
    idPreviousStep: string,
    idStep: string
  ): Promise<any> {
    let result = await lastValueFrom(
      this.stepService.getStepsWithoutNext(idProcess, idPreviousStep, idStep)
    );
    return result;
  }

  async updateStep(stepUpdate: StepUpdate): Promise<any> {
    return await lastValueFrom(this.stepService.updateStep(stepUpdate));
  }
}
