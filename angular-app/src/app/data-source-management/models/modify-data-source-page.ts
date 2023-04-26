import { Constants } from 'src/app/common/constants';
import { DataSourceQuery } from './data-source-query';
import { DataSourceUpdate } from './data-source-update';

export class ModifyDataSourcePage {
  listDataSourceTypes: string[] = Constants.dataSourceType;
  selectedValueType!: string;
  dataSource: DataSourceQuery = new DataSourceQuery();
  dataSourceUpdated: DataSourceUpdate = new DataSourceUpdate();
}
