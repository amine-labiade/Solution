import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { ProcessResponse } from '../../models/process/process-response';
import { ProcessService } from '../../services/process.service';

@Injectable({
  providedIn: 'root',
})
export class ListProcessService {
  constructor(public processService: ProcessService) {}

  /**
   * Gets list of processes that are unarchived
   * @returns a filtered list of processes that are unarchived
   */
  async getAllProcesses(): Promise<ProcessResponse[]> {
    let result = await lastValueFrom(this.processService.getAllProcesses());
    return result.filter((p) => !p.isArchived);
  }
  /**
   * Archives the selected process
   */
  async archiveProcess(id: string): Promise<any> {
    return await lastValueFrom(this.processService.archiveProcess(id));
  }

  /**
   * Lets you add/remove the selected process to/from favourites 
  */
  async favoriteUnfavoriteProcess(id: string) : Promise<any> {
    return await lastValueFrom(this.processService.favoriteUnfavoriteProcess(id));;
  }



}
