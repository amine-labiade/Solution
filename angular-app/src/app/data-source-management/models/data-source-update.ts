import { DataSourceType } from 'src/app/common/data-source-type.enum';

export class DataSourceUpdate {
  id!: string;
  name!: string;
  connectionLink!: string;
  description!: string;
  type!: DataSourceType;
  userAccesId!: string;
  password!: string;
  acessToken!: string;
}
