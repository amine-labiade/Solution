import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { SelectListItem } from 'src/app/common/select-list-item';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InventoryTypeService {
  private baseUrl: string = environment.API_URL;

  httpOtions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Allow-Origin': '*',
    }),
  };
  constructor(private http: HttpClient) {}

  /**
   * this function is used to retrieve all inventory types from database
   * @returns
   */
  getAllInventoryTypes(): Observable<SelectListItem[]> {
    return this.http
      .get<SelectListItem[]>(`${this.baseUrl}InventoryType`)
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
