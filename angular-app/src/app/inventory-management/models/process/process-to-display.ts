import { StepResponseDetail } from '../step/step-response-detail';
import { UserResponse } from '../user/user-response';
import { UserResponseApi } from '../user/user-response-api';

export class ProcessToDisplay {
  id!: string;
  name!: string;
  description!: string;
  creationDate!: Date;
  typeId!: number;
  publishingDate!: Date;
  unpublishingDate!: Date;
  dataSourceId!: string;
  users: UserResponseApi[] = [];
  steps: StepResponseDetail[] = [];
}
