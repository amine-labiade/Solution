import { Injectable } from '@angular/core';
import { DataSourceType } from 'src/app/common/data-source-type.enum';
import { EncryptDecryptPasswordService } from 'src/app/common/encrypt-decrypt-password.service';
import { DataSourceQuery } from '../../models/data-source-query';
import { DataSourceService } from '../../services/data-source.service';
@Injectable({
  providedIn: 'root',
})
export class CreateDataSourceEditionService {
  constructor(
    private dataSourceService: DataSourceService,
    private servicePassword: EncryptDecryptPasswordService
  ) {}

  /**
   * check if the form data is valid
   * @param dataSource
   * @returns true or false
   */
  valideForm(dataSource: any) {
    if (dataSource.type === DataSourceType.withoutAuthentication) {
      if (!dataSource.name || !dataSource.connectionLink) {
        return false;
      }
    } else {
      if (dataSource.type === DataSourceType.basicAuthentication) {
        if (
          !dataSource.name ||
          !dataSource.connectionLink ||
          !dataSource.userAccesId ||
          !dataSource.password
        ) {
          return false;
        }
      } else {
        if (
          !dataSource.name ||
          !dataSource.connectionLink ||
          !dataSource.acessToken
        ) {
          return false;
        }
      }
    }
    return true;
  }
  /**
   * Convert string to enumeration
   * @param type
   * @returns enum data source type
   */
  setDataSourceType(type: string) {
    switch (type) {
      case 'Publique':
        return DataSourceType.withoutAuthentication;
      case 'Authentification basic':
        return DataSourceType.basicAuthentication;
      case 'Authentification avec jetons':
        return DataSourceType.bearerToken;
    }
    return DataSourceType.withoutAuthentication;
  }

  /**
   * this function is used to call the validation function then if true encrypt
   * the password and then save the data in the database
   * @param dataSource
   * @returns true or false
   */
  async saveDataSource(dataSource: DataSourceQuery): Promise<any> {
    if (this.valideForm(dataSource) == false) {
      return false;
    } else {
      if (dataSource.password) {
        let encryptPassword = this.servicePassword.encryptUsingAES256(
          dataSource.password
        );
        dataSource.password = encryptPassword;
      }
      await this.dataSourceService.createDataSource(dataSource).toPromise();
      return true;
    }
  }
}
