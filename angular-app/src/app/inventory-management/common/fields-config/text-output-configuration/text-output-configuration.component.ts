import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FieldType } from 'src/app/common/field-type';
import { TextOutputConfigurationPage } from 'src/app/inventory-management/models/fields/text-output/text-output-configuration-page';
import Swal from 'sweetalert2';
import { ConfigurationMatcher } from '../../models/configuration-matcher';
import { FieldConfigurationSharingService } from '../../services/field-configuration-sharing.service';
import { TextOutputConfigurationEditionService } from './text-output-configuration-edition.service';

@Component({
  selector: 'app-text-output-configuration',
  templateUrl: './text-output-configuration.component.html',
  styleUrls: ['./text-output-configuration.component.css'],
})
export class TextOutputConfigurationComponent implements OnInit {
  pageObject: TextOutputConfigurationPage = new TextOutputConfigurationPage();
  configMatcher!: ConfigurationMatcher;
  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private textOutputConfigurationEdition: TextOutputConfigurationEditionService,
    private fieldConfigurationSharingService: FieldConfigurationSharingService
  ) {}

  ngOnInit() {
    this.configMatcher = this.config.data?.value;
    if (this.configMatcher.fieldConfiguration != null) {
      this.pageObject.fieldResponse =
        this.configMatcher.fieldConfiguration.fieldResponse;
    }
  }

  /**
   * this function is used to create new field
   * @param value
   */
  createField(value: any) {
    this.pageObject.fieldConfiguration.label = value.labelInput;
    this.pageObject.fieldConfiguration.value = value.textInput;
    let result = this.textOutputConfigurationEdition.validForm(
      this.pageObject.fieldConfiguration
    );
    this.pageObject.fieldConfiguration.position =
      this.config.data?.value.fieldPosition;
    this.pageObject.fieldConfiguration.fieldCategory =
      this.config.data?.value.fieldCategory;
    if (result === false) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields highlighted in red have to be filled',
        confirmButtonText: 'Close',
        confirmButtonColor: '#1F7ACE',
      });
    } else {
      this.configMatcher = this.config.data?.value;
      this.fieldConfigurationSharingService.updateConfiguration({
        configuration: this.pageObject,
        fieldPosition: this.config.data?.value.fieldPosition,
        fieldCategory: FieldType.text_output,
      });

      if(this.pageObject.fieldResponse.id){
        this.pageObject.fieldResponse = {id : this.pageObject.fieldResponse.id, category : parseFloat(this.pageObject.fieldConfiguration.fieldCategory), ...this.pageObject.fieldConfiguration}
      }else{
        this.pageObject.fieldResponse = {id : "", category : parseFloat(this.pageObject.fieldConfiguration.fieldCategory), ...this.pageObject.fieldConfiguration}
      }
      this.ref.close();
    }
  }

  /**
   * this function is used to retrieve data from the forms and send them
   * to the service for verification and registration in the database and
   * call the appropriate function
   * @param value
   */
  submitConfiguration(value: any) {
    if (this.pageObject.fieldResponse.id) {
      this.updateField(value);
    } else {
      this.createField(value);
    }
  }
  /**
   * this function is used to update field
   * @param value
   */
  updateField(value: any) {
    this.pageObject.fieldUpdated.id = this.pageObject.fieldResponse.id;
    this.pageObject.fieldUpdated.label = value.labelInput;
    this.pageObject.fieldUpdated.value = value.textInput;
    let result = this.textOutputConfigurationEdition.validForm(
      this.pageObject.fieldUpdated
    );
    this.pageObject.fieldUpdated.position =
      this.config.data?.value.fieldPosition;
    this.pageObject.fieldUpdated.fieldCategory =
      this.config.data?.value.fieldCategory;
    if (result === false) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields highlighted in red have to be filled',
        confirmButtonText: 'Close',
        confirmButtonColor: '#1F7ACE',
      });
    } else {
      this.pageObject.fieldConfiguration = {...this.pageObject.fieldUpdated}
      this.configMatcher = this.config.data?.value;
      this.fieldConfigurationSharingService.updateConfiguration({
        configuration: this.pageObject,
        fieldPosition: this.config.data?.value.fieldPosition,
        fieldCategory: FieldType.text_output,
      });

      if(this.pageObject.fieldResponse.id){
        this.pageObject.fieldResponse = {id : this.pageObject.fieldResponse.id, category : parseFloat(this.pageObject.fieldConfiguration.fieldCategory), ...this.pageObject.fieldConfiguration}
      }else{
        this.pageObject.fieldResponse = {id : "", category : parseFloat(this.pageObject.fieldConfiguration.fieldCategory), ...this.pageObject.fieldConfiguration}
      }
      this.ref.close();
    }
  }
}
