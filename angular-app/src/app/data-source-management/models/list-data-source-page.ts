import { Constants } from 'src/app/common/constants';
import { DataSourceResponse } from './data-source-response';

export class ListDataSourcePage {
  dataSources: DataSourceResponse[] = [];
  listDataSourceTypes: string[] = Constants.dataSourceType;
}
