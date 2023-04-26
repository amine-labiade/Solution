import { Injectable } from '@angular/core';
import { ProcessService } from '../../services/process.service';

@Injectable({
  providedIn: 'root',
})
export class ProcessDetailsEditionService {
  constructor(private processService: ProcessService) {}

  /**
   * this function is used to retrieve process detail from backend
   * @returns process
   */
  async getProcessDetailById(id: string): Promise<any> {
    return await this.processService.getProcessDetail(id).toPromise();
  }
}
