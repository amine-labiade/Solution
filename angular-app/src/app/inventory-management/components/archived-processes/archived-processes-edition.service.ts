import { Injectable } from '@angular/core';
import { StatOfBackend } from 'src/app/common/state-of-backend.enum';
import { ProcessService } from '../../services/process.service';

@Injectable({
  providedIn: 'root',
})
export class ArchivedProcessesEditionService {
  constructor(public processService: ProcessService) {}

  async getArchivedProcesses(): Promise<any> {
    return await this.processService.getArchivedProcesses().toPromise();
  }

  /**
   * this function is used to delete process in backend
   * @param id of process
   * @returns 0 if process deleted, 1 if process doesn't exist and
   */
  async deleteProcess(id: string): Promise<any> {
    let result = await this.processService.deleteProcess(id).toPromise();
    switch (result) {
      case 0:
        return StatOfBackend.Success;
      case 1:
        return StatOfBackend.NotExist;
    }
  }
}
