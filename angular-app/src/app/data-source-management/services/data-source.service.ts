import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { SelectListItemString } from 'src/app/common/select-list-item-string';
import { UserResponseApi } from 'src/app/inventory-management/models/user/user-response-api';
import { environment } from 'src/environments/environment';
import { DataSourceQuery } from '../models/data-source-query';
import { DataSourceResponse } from '../models/data-source-response';
import { DataSourceUpdate } from '../models/data-source-update';

@Injectable({
  providedIn: 'root',
})
export class DataSourceService {
  private baseUrl: string = environment.API_URL;

  httpOtions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Allow-Origin': '*',
    }),
  };

  constructor(private http: HttpClient) {}
  /**
   * this function is used to retrieve all data sources from database
   * @returns data sources list items
   */
  getAllDataSourcesItems(): Observable<SelectListItemString[]> {
    return this.http
      .get<SelectListItemString[]>(
        `${this.baseUrl}DataSource/GetAllDataSourcesItems`
      )
      .pipe(catchError(this.errorHandler));
  }
  /**
   * this function is used to retrieve all data sources from database
   * @returns data sources
   */
  getAllDataSources(): Observable<DataSourceResponse[]> {
    return this.http
      .get<DataSourceResponse[]>(`${this.baseUrl}DataSource`)
      .pipe(catchError(this.errorHandler));
  }
  /**
   * this function is used to create data sources in database
   * @param dataSource
   * @returns
   */
  createDataSource(dataSource: DataSourceQuery): Observable<any> {
    return this.http
      .post(`${this.baseUrl}DataSource`, dataSource)
      .pipe(catchError(this.errorHandler));
  }
  /**
   * this function is used to retrieve data source from database
   * @param id of data source
   * @returns data source
   */
  getDataSourceById(id: string): Observable<DataSourceQuery> {
    return this.http
      .get<DataSourceQuery>(`${this.baseUrl}DataSource/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  /**
   * this function is used to update data source in database
   * @param dataSourceUpdated
   * @returns
   */
  updateDataSource(dataSourceUpdated: DataSourceUpdate): Observable<any> {
    return this.http
      .put<DataSourceUpdate>(
        `${this.baseUrl}DataSource/${dataSourceUpdated.id}`,
        dataSourceUpdated
      )
      .pipe(catchError(this.errorHandler));
  }
  /**
   * this function is used to delete data source in database
   * @param id
   * @returns
   */
  deleteDataSource(id: string): Observable<any> {
    return this.http
      .delete<Response>(`${this.baseUrl}DataSource/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * this function is used to get all users from data source
   * @param id
   * @returns users from data source
   */
  getUsersFromDataSource(id: string): Observable<UserResponseApi[]> {
    return this.http
      .get<UserResponseApi[]>(`${this.baseUrl}DataSource/usersFromApi/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * this function is used to get all data from external API
   * @param id
   * @returns
   */
  getDataFromDataSource(id: string): Observable<SelectListItemString[]> {
    return this.http
      .get<SelectListItemString[]>(
        `${this.baseUrl}DataSource/dataFromApi/${id}`
      )
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
