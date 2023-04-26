import { Injectable } from '@angular/core';
import { FieldService } from '../../services/field.service';

@Injectable({
  providedIn: 'root',
})
export class FieldDetailsEditionService {
  constructor(private fieldService: FieldService) {}

  /**
   * this function is used to retrieve field detail from backend
   * @param id
   * @param category
   * @returns object
   */
  async getFieldDetailsById(id: string, category: string): Promise<any> {
    return await this.fieldService
      .getFieldDeatailsById(id, category)
      .toPromise();
  }
}
