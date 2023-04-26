import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FieldConfiguration } from '../models/field-configuration';

@Injectable({
  providedIn: 'root'
})
export class FieldConfigurationSharingService {

  fieldConfiguration: FieldConfiguration = {configuration : null} ;
  
  private configurationSource = new BehaviorSubject(this.fieldConfiguration)

  currentConfiguration = this.configurationSource.asObservable();
  constructor() { }

  updateConfiguration( configuration : FieldConfiguration) {
    this.configurationSource.next(configuration);
  }  
}
