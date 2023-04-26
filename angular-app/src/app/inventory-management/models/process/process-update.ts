import { ProcessState } from 'src/app/common/process-state.enum';
import { UserQuery } from '../user/user-query';

export class ProcessUpdate {
  id!: string | null;
  name!: string;
  description!: string;
  typeId!: number;
  publishingDate!: Date;
  unpublishingDate!: Date;
  usersDataSourceId!: string;
  users: UserQuery[] = [];
  steps: string[] = [];
}
