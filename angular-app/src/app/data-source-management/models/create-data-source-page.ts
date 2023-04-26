import { Constants } from 'src/app/common/constants';
import { DataSourceQuery } from './data-source-query';

export class CreateDataSourcePage {
  listDataSourceTypes: string[] = Constants.dataSourceType;
  dataSource: DataSourceQuery = new DataSourceQuery();
  selectedValue: string = 'Publique';
}
