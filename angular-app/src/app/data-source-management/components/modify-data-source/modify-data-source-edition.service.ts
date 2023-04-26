import { Injectable } from '@angular/core';
import { DataSourceType } from 'src/app/common/data-source-type.enum';
import { EncryptDecryptPasswordService } from 'src/app/common/encrypt-decrypt-password.service';
import { DataSourceUpdate } from '../../models/data-source-update';
import { DataSourceService } from '../../services/data-source.service';
import { CreateDataSourceEditionService } from '../create-data-source/create-data-source-edition.service';

@Injectable({
  providedIn: 'root',
})
export class ModifyDataSourceEditionService {
  constructor(
    private dataSourceService: DataSourceService,
    private servicePassword: EncryptDecryptPasswordService,
    private createDataSourceEdition: CreateDataSourceEditionService
  ) {}
  /**
   * this function is used to retrieve data source from database
   * @param id of data source
   * @returns data source
   */
  async getOneDataSource(id: string): Promise<any> {
    let result = await this.dataSourceService.getDataSourceById(id).toPromise();
    if (result != null) {
      if (result.password != null) {
        let decryptedPassword = this.servicePassword.decryptUsingAES256(
          result.password
        );
        result.password = decryptedPassword;
      }
    }
    return result;
  }

  /**
   * Convert enumeration to string
   * @param type
   * @returns data source type
   */
  enumTostringDataSourceType(type: DataSourceType) {
    switch (type) {
      case DataSourceType.withoutAuthentication:
        return 'Publique';
      case DataSourceType.basicAuthentication:
        return 'Authentification basic';
      case DataSourceType.bearerToken:
        return 'Authentification avec jetons';
    }
  }
  /**
   * this function is used to modify data source in database
   * @param dataSource
   * @returns true or false
   */
  async UpdateDataSource(dataSource: DataSourceUpdate): Promise<any> {
    if (this.createDataSourceEdition.valideForm(dataSource) == false) {
      return false;
    } else {
      if (dataSource.password) {
        let encryptPassword = this.servicePassword.encryptUsingAES256(
          dataSource.password
        );
        dataSource.password = encryptPassword;
      }
      await this.dataSourceService.updateDataSource(dataSource).toPromise();
      return true;
    }
  }
}
