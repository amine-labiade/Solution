import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StepPage } from '../models/step/step-page';
import { StepResponseMoreDetails } from '../models/step/step-response-more-details';
import { StepQuery } from '../models/step/step-query';
import { StepResponse } from '../models/step/step-response';
import { StepToDisplay } from '../models/step/step-to-display';
import { StepUpdate } from '../models/step/step-update';

@Injectable({
  providedIn: 'root',
})
export class StepService {
  private baseUrl: string = environment.API_URL;
  httpOtions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Allow-Origin': '*',
    }),
  };
  constructor(private httpClient: HttpClient) {}

  /**
   * this function is used to delete step in backend
   * @param id
   * @returns
   */
  deleteStep(id: string): Observable<any> {
    return this.httpClient
      .delete<Response>(`${this.baseUrl}Step/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  createNewStep(stepQuery: StepQuery): Observable<any> {
    return this.httpClient
      .post(`${this.baseUrl}Step`, stepQuery)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * update step
   * @param stepUpdate
   * @returns step
   */
  updateStep(stepUpdate: StepUpdate): Observable<any> {
    return this.httpClient
      .put<StepUpdate>(`${this.baseUrl}Step/${stepUpdate.id}`, stepUpdate)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * get details of step for update
   * @param id
   * @returns step
   */
  getStepById(id: string): Observable<StepToDisplay> {
    return this.httpClient
      .get<StepToDisplay>(`${this.baseUrl}Step/getStepForUpdate/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * get steps without next for process and current step
   * @param idProcess
   * @param idStep
   * @returns steps without next and current step
   */
  getStepsWithoutNext(
    idProcess: string,
    idPreviousStep: string,
    idStep: string
  ): Observable<StepResponse[]> {
    if (idPreviousStep === null) {
      idPreviousStep = '00000000-0000-0000-0000-000000000000';
    }
    let params = new HttpParams();
    params = params.append('idPreviousStep', idPreviousStep);
    return this.httpClient.get<StepResponse[]>(
      `${this.baseUrl}Step/getStepsWithoutNext/${idProcess}/${idStep}`,
      { params: params }
    );
  }
  /* this function is used to retrieve step details from backend
   * @param id of step
   * @returns details of step
   */
  getStepDetail(id: string): Observable<StepResponseMoreDetails> {
    return this.httpClient
      .get<StepResponseMoreDetails>(`${this.baseUrl}Step/${id}`)
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
