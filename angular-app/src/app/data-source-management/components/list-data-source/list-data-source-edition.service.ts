import { Injectable } from '@angular/core';
import { DataSourceType } from 'src/app/common/data-source-type.enum';
import { StatOfBackend } from 'src/app/common/state-of-backend.enum';
import { DataSourceResponse } from '../../models/data-source-response';
import { DataSourceService } from '../../services/data-source.service';

@Injectable({
  providedIn: 'root',
})
export class ListDataSourceEditionService {
  constructor(private dataSourceService: DataSourceService) {}
  /**
   * this function is used to retrieve data sources from database
   * @returns data sources
   */
  async getDataSources(): Promise<any> {
    let result = await this.dataSourceService.getAllDataSources().toPromise();
    return result;
  }

  /**
   * Change for each data source the type
   * @returns data sources
   */
  async getDataSourcesUpdated() {
    let dataSources: DataSourceResponse[] = await this.getDataSources();
    let dataSourcesUpdated: DataSourceResponse[] = [];
    for (let dataSource of dataSources) {
      dataSource.type = this.enumToStringForDataSourceType(dataSource.type);
      dataSourcesUpdated.push(dataSource);
    }
    return dataSourcesUpdated;
  }

  /**
   * Convert data source type enum to string
   * @param type
   * @returns data source type string
   */
  enumToStringForDataSourceType(type: string) {
    switch (type) {
      case 'BasicAuthentication':
        return 'Authentification basic';
      case 'WithoutAuthentication':
        return 'Publique';
      case 'BearerToken':
        return 'Authentification avec jetons';
    }
    return '';
  }

  /**
   * this function is used to delete data source in database
   * @param id of data source
   * @returns 0 if data source deleted, 1 if data source doesn't exist and
   *  2 if data source is used in anothder field
   */
  async deleteDataSource(id: string): Promise<any> {
    let result = await this.dataSourceService.deleteDataSource(id).toPromise();
    switch (result) {
      case 0:
        return StatOfBackend.Success;
      case 1:
        return StatOfBackend.NotExist;
      case 2:
        return StatOfBackend.IsForeignKey;
    }
  }
}
