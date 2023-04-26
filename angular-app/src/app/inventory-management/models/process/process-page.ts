import { SelectListItem } from 'src/app/common/select-list-item';
import { SelectListItemString } from 'src/app/common/select-list-item-string';
import { UserResponse } from '../user/user-response';
import { UserResponseApi } from '../user/user-response-api';
import { ProcessQuery } from './process-query';
import { ProcessToDisplay } from './process-to-display';
import { ProcessUpdate } from './process-update';

export class ProcessPage {
  inventoryTypes: SelectListItem[] = [];
  dataSources!: SelectListItemString[];
  users: UserResponseApi[] = [];
  steps: any[] = [];
  selectedUsers: {
    username: string;
    encryptedPassword: string;
    roleName: string;
  }[] = [];
  stateValidationDate!: number;
  isCreationProcess!: Boolean;
  idProcessToGet: string | null = null;
  processToDisplay: ProcessToDisplay = new ProcessToDisplay();
  processUpdate: ProcessUpdate = new ProcessUpdate();
  usersForTable: any[] = [];
  usersFromApi: UserResponseApi[] = [];
  defaultsUsers: UserResponse[] = [];
}
