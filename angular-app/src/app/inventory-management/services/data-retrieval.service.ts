import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataRetrievalService {

  private baseUrl: string = environment.API_URL;
  httpOtions = {
    headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Allow-Origin': '*',
      })
  }
  constructor(private httpClient: HttpClient) { }

  /**
   * Method used to retrive option/values for multiple choice buttons and dropdowns
   * from an external data source
   * takes the id of the data source to retrieve data from
   */
  retrieveData(id : string): Observable<any>{
    return this.httpClient.get(`${this.baseUrl}DataSource/dataFromApi/${id}`)
    .pipe(catchError(this.errorHandler))
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
