import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProcessArchivedResponse } from '../models/process/process-archived-response';
import { ProcessQuery } from '../models/process/process-query';
import { ProcessDetail } from '../models/process/process-detail';
import { ProcessResponse } from '../models/process/process-response';
import { ProcessToDisplay } from '../models/process/process-to-display';

import { ProcessUpdate } from '../models/process/process-update';

@Injectable({
  providedIn: 'root',
})
export class ProcessService {
  private baseUrl: string = environment.API_URL;
  httpOtions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Allow-Origin': '*',
    }),
  };
  constructor(private httpClient: HttpClient) {}

  /**
   * Returns all processes from the backend
   * @returns
   */
  getAllProcesses(): Observable<ProcessResponse[]> {
    return this.httpClient
      .get<ProcessResponse[]>(`${this.baseUrl}InventoryProcess`)
      .pipe(catchError(this.errorHandler));
  }


  /**
   * Function to archive a process
   * @param id Id of the process to be archived
   * @returns true or false if an error has occured as process was being archived
   */
  archiveProcess(id: string): Observable<any> {
    return this.httpClient
      .get(`${this.baseUrl}InventoryProcess/archive/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * this function is used to retrieve process from backend
   * @param id of process
   * @returns process
   */
  getProcessById(id: string): Observable<ProcessToDisplay> {
    return this.httpClient
      .get<ProcessToDisplay>(
        `${this.baseUrl}InventoryProcess/processToUpdate/${id}`
      )
      .pipe(catchError(this.errorHandler));
  }

  /**
   * this function is used to retrieve process details from backend
   * @param id of process
   * @returns detail process
   */
  getProcessDetail(id: string): Observable<ProcessDetail> {
    return this.httpClient
      .get<ProcessDetail>(`${this.baseUrl}InventoryProcess/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * A function that lets you favorite or unfavorite a process.
   */
  favoriteUnfavoriteProcess(id: string): Observable<any> {
    return this.httpClient
      .get(`${this.baseUrl}InventoryProcess/favorite/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * this function is used to retrieve all archived processes from backend
   * @returns list of archived processes or null
   */
  getArchivedProcesses(): Observable<ProcessArchivedResponse[]> {
    return this.httpClient
      .get<ProcessArchivedResponse[]>(
        `${this.baseUrl}InventoryProcess/archivedProcesses`
      )
      .pipe(catchError(this.errorHandler));
  }
  /**
   * this function is used to update process in Backend
   * @param processUpdated
   * @returns
   */
  updateProcess(processUpdated: ProcessUpdate): Observable<any> {
    return this.httpClient
      .put<ProcessUpdate>(
        `${this.baseUrl}InventoryProcess/${processUpdated.id}`,
        processUpdated
      )
      .pipe(catchError(this.errorHandler));
  }

  /**
   * Adds a new process
   * @param processQuery process to be added
   * @returns process id after it is added successfully to db
   */
  createProcess(processQuery : ProcessQuery): Observable<any> {
    return this.httpClient.post<ProcessQuery>(`${this.baseUrl}InventoryProcess`, processQuery).pipe(
      catchError(this.errorHandler));
    }
    
  /** 
   * this function is used to delete process in backend
   * @param id
   * @returns
   */
  deleteProcess(id: string): Observable<any> {
    return this.httpClient
      .delete<Response>(`${this.baseUrl}InventoryProcess/${id}`)
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
