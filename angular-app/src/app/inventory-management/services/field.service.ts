import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FieldService {
  private baseUrl: string = environment.API_URL;

  httpOtions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Allow-Origin': '*',
    }),
  };

  constructor(private http: HttpClient) {}

  /**
   * this function is used to retrieve field details from backend
   * @param id
   * @param category
   * @returns object
   */
  getFieldDeatailsById(id: string, category: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('category', category);
    return this.http
      .get<any>(`${this.baseUrl}Field/fieldDetails/${id}`, { params: params })
      .pipe(catchError(this.errorHandler));
  }

  /**
   * Display error message
   * @param error
   * @returns error message
   */
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
