import { DataSourceType } from 'src/app/common/data-source-type.enum';

export class DataSourceQuery {
  name!: string;
  connectionLink!: string;
  description!: string;
  userAccesId!: string;
  password!: string;
  type!: DataSourceType;
  acessToken!: string;
}
