import { SelectionModel } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { EncryptDecryptPasswordService } from 'src/app/common/encrypt-decrypt-password.service';
import { ProcessState } from 'src/app/common/process-state.enum';
import { SelectListItem } from 'src/app/common/select-list-item';
import { SelectListItemString } from 'src/app/common/select-list-item-string';
import { StatOfBackend } from 'src/app/common/state-of-backend.enum';
import { StateOfValidationForm } from 'src/app/common/state-of-validation-form.enum';
import { DataSourceService } from 'src/app/data-source-management/services/data-source.service';
import { ProcessQuery } from '../../models/process/process-query';
import { ProcessUpdate } from '../../models/process/process-update';

import { StepResponse } from '../../models/step/step-response';
import { StepResponseDetail } from '../../models/step/step-response-detail';
import { UserQuery } from '../../models/user/user-query';
import { UserResponse } from '../../models/user/user-response';
import { UserResponseApi } from '../../models/user/user-response-api';

import { InventoryTypeService } from '../../services/inventory-type.service';
import { ProcessService } from '../../services/process.service';
import { StepService } from '../../services/step.service';

@Injectable({
  providedIn: 'root',
})
export class CreationProcessEditionService {
  constructor(
    private inventoryTypeService: InventoryTypeService,
    private dataSourceService: DataSourceService,
    private processService: ProcessService,
    private encryptionService: EncryptDecryptPasswordService,
    private stepService: StepService
  ) {}

  /**
   * this function is used to retrieve all inventory type
   * @returns inventory types
   */
  async getInventoryTypes(): Promise<any> {
    let result = await lastValueFrom(
      this.inventoryTypeService.getAllInventoryTypes()
    );
    return result;
  }

  /**
   * this function is used to retrieve all data sources from database
   * @returns data sources
   */
  async getDataSources(): Promise<any> {
    let result = await lastValueFrom(
      this.dataSourceService.getAllDataSourcesItems()
    );
    return result;
  }

  /**
   * this function is used to retrieve process from backend
   * @returns process
   */
  async getProcessById(id: any): Promise<any> {
    return await this.processService.getProcessById(id).toPromise();
  }
  /**
   * get all users from data source
   * @param id
   * @returns users
   */
  async getUsers(id: string): Promise<any> {
    let users = await this.dataSourceService
      .getUsersFromDataSource(id)
      .toPromise();
    return users;
  }

  /**
   * this function is used to transform list of users (id,username,password)
   * to list of selet item (value,label)
   * @param users
   * @returns select item of users
   */
  transformListToSelectListItem(users: UserResponseApi[]) {
    let transformList: SelectListItemString[] = [];
    for (let user of users) {
      let data: SelectListItemString = {
        value: user.id,
        label: user.username,
      };
      transformList.push(data);
    }
    return transformList;
  }

  /**
   * this function is used to return default ids (retrieve ids from the api) of users
   * @param usersFromDb
   * @param users
   * @returns default users
   */
  setDefaultUsers(usersFromDb: UserResponse[], usersFromApi: UserResponse[]) {
    let defaultUsers: UserResponse[] = [];
    for (let user of usersFromApi) {
      if (usersFromDb.find((u) => u.username === user.username)) {
        defaultUsers.push(user);
      }
    }
    return defaultUsers;
  }

  /**
   *this function allows to get the selected users and 
   retrieve them in list of type userQuery
   * @param users 
   * @param selectedUsers 
   * @returns selected users
   */
  setSelectedUsers(users: UserResponseApi[], selectedUsers: any[]) {
    let selectedUsersList: UserQuery[] = [];
    for (let user of users) {
      if (selectedUsers.find((u) => u.id === user.id)) {
        let data: UserQuery = {
          username: user.username,
          encryptedPassword: this.encryptionService.encryptUsingAES256(
            user.password
          ),
          roleName: 'inventoriste',
        };
        selectedUsersList.push(data);
      }
    }
    return selectedUsersList;
  }
  /**
   * this function returns a list of ids for the steps
   * @param steps
   * @returns Liste ids of steps
   */
  getListStepsIds(steps: StepResponseDetail[]) {
    let stepIds: string[] = [];
    for (let step of steps) {
      stepIds.push(step.id);
    }
    return stepIds;
  }

  /**
   * check if the form data is valid
   * @param dataSource
   * @returns true or false
   */
  valideForm(process: any) {
    if (!process.name || !process.typeId) {
      return false;
    }
    return true;
  }

  /**
   * check if the form data is valid
   * @param process
   * @returns
   */
  validateDates(process: any) {
    if (
      !(process.publishingDate instanceof Date) &&
      process.unpublishingDate instanceof Date
    ) {
      return StateOfValidationForm.startDateIsNull;
    }
    if (
      process.publishingDate instanceof Date &&
      !(process.unpublishingDate instanceof Date)
    ) {
      return StateOfValidationForm.endDateIsNull;
    }
    if (
      process.publishingDate instanceof Date &&
      process.unpublishingDate instanceof Date
    ) {
      if (process.publishingDate >= process.unpublishingDate) {
        return StateOfValidationForm.startDateGreaterEndDate;
      }
    }
    return StateOfValidationForm.valid;
  }

  /**
   * update process
   * @param process
   */
  async updateProcess(process: ProcessUpdate) {
    await this.processService.updateProcess(process).toPromise();
  }

  /**
   * Creating a new process
   */
  async createProcess(processQuery: ProcessQuery) {
    let result = await lastValueFrom(
      this.processService.createProcess(processQuery)
    );
    return result;
  }

  /**
   * this function is used to delete step in Backend
   * @param id of step
   * @returns 0 if step deleted, 1 if step doesn't exist
   */
  async deleteStep(id: string): Promise<any> {
    let result = await this.stepService.deleteStep(id).toPromise();
    return result;
  }
}
