
import { StepResponseDetail } from '../step/step-response-detail';
import { UserDetail } from '../user/user-detail';

export class ProcessDetail {
  id!: string;
  name!: string;
  description!: string;
  creationDate!: Date;
  type!: string;
  state!: string;
  isFavorite!: boolean;
  stepsCount!: number;
  fieldsCount!: number;
  usersCount!: number;
  publishingDate!: Date;
  unpublishingDate!: Date;
  dataSource!: string;
  processSteps: StepResponseDetail[] = [];
  users: UserDetail[] = [];
}
