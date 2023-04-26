import { DataSourceType } from 'src/app/common/data-source-type.enum';

export class DataSourceResponse {
  id!: string;
  name!: string;
  description!: string;
  type!: string;
}
