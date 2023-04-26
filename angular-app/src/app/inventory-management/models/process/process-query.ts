import { UserQuery } from '../user/user-query';

export class ProcessQuery {
  name!: string;
  description!: string;
  type!: number;
  publishingDate!: string;
  unpublishingDate!: string;
  usersDataSourceId!: string;
  processStepsIds: { stepId: string }[] = [];
  processUsers: UserQuery[] = [];
}
