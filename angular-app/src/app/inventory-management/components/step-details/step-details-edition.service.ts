import { Injectable } from '@angular/core';
import { StepService } from '../../services/step.service';

@Injectable({
  providedIn: 'root',
})
export class StepDetailsEditionService {
  constructor(private stepService: StepService) {}

  /**
   * this function is used to retrieve step details from backend
   * @returns process
   */
  async getStepDetailById(id: string): Promise<any> {
    return await this.stepService.getStepDetail(id).toPromise();
  }
}
