import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FieldType } from 'src/app/common/field-type';
import { StateOfValidationForm } from 'src/app/common/state-of-validation-form.enum';
import { TextInputConfigurationPage } from 'src/app/inventory-management/models/fields/text-input/text-input-configuration-page';
import Swal from 'sweetalert2';
import { ConfigurationMatcher } from '../../models/configuration-matcher';
import { FieldConfigurationSharingService } from '../../services/field-configuration-sharing.service';
import { TextInputConfigurationEditionService } from './text-input-configuration-edition.service';

@Component({
  selector: 'app-text-input-configuration',
  templateUrl: './text-input-configuration.component.html',
  styleUrls: ['./text-input-configuration.component.css'],
})
export class TextInputConfigurationComponent implements OnInit {
  pageObject: TextInputConfigurationPage = new TextInputConfigurationPage();

  configMatcher!: ConfigurationMatcher;
  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private TextInputConfigurationEdition: TextInputConfigurationEditionService,
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
    this.pageObject.fieldConfiguration.name = value.nameInput;
    this.pageObject.fieldConfiguration.placeholder = value.placeholderInput;
    this.pageObject.fieldConfiguration.textInputType = value.typeInput;
    this.pageObject.fieldConfiguration.textInputMin = value.minInput;
    this.pageObject.fieldConfiguration.textInputMax = value.maxInput;
    this.pageObject.fieldConfiguration.validationRegex =
      value.validationTypeInput;
    this.pageObject.fieldConfiguration.position =
      this.config.data?.value.fieldPosition;
    this.pageObject.fieldConfiguration.fieldCategory =
      this.config.data?.value.fieldCategory;
    if (!value.isRequiredCheck) {
      this.pageObject.fieldConfiguration.isRequired = false;
    } else {
      this.pageObject.fieldConfiguration.isRequired = value.isRequiredCheck;
    }
    let result = this.TextInputConfigurationEdition.validForm(
      this.pageObject.fieldConfiguration
    );
    if (result === StateOfValidationForm.empty) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields highlighted in red have to be filled',
        confirmButtonText: 'Close',
        confirmButtonColor: '#1F7ACE',
      });
    } else {
      if (
        result === StateOfValidationForm.minMaxNotValid ||
        result === StateOfValidationForm.minMaxDateNotValid
      ) {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Careful, min is bigger than max!!!',
          confirmButtonText: 'Close',
          confirmButtonColor: '#1F7ACE',
        });
      } else {
        this.configMatcher = this.config.data?.value;
        this.fieldConfigurationSharingService.updateConfiguration({
          configuration: this.pageObject,
          fieldPosition: this.config.data?.value.fieldPosition,
          fieldCategory: FieldType.text_input,
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
    this.pageObject.fieldUpdated.name = value.nameInput;
    this.pageObject.fieldUpdated.placeholder = value.placeholderInput;
    this.pageObject.fieldUpdated.textInputType = value.typeInput;
    this.pageObject.fieldUpdated.textInputMin = value.minInput;
    this.pageObject.fieldUpdated.textInputMax = value.maxInput;
    this.pageObject.fieldUpdated.validationRegex = value.validationTypeInput;
    this.pageObject.fieldUpdated.position =
      this.config.data?.value.fieldPosition;
    this.pageObject.fieldUpdated.fieldCategory =
      this.config.data?.value.fieldCategory;
    if (!value.isRequiredCheck) {
      this.pageObject.fieldUpdated.isRequired = false;
    } else {
      this.pageObject.fieldUpdated.isRequired = value.isRequiredCheck;
    }
    let result = this.TextInputConfigurationEdition.validForm(
      this.pageObject.fieldUpdated
    );
    if (result === StateOfValidationForm.empty) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields highlighted in red have to be filled',
        confirmButtonText: 'Close',
        confirmButtonColor: '#1F7ACE',
      });
    } else {
      if (
        result === StateOfValidationForm.minMaxNotValid ||
        result === StateOfValidationForm.minMaxDateNotValid
      ) {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Careful, min is bigger than max!!!',
          confirmButtonText: 'Close',
          confirmButtonColor: '#1F7ACE',
        });
      } else {
        this.pageObject.fieldConfiguration = {...this.pageObject.fieldUpdated}
        this.configMatcher = this.config.data?.value;
        this.fieldConfigurationSharingService.updateConfiguration({
          configuration: this.pageObject,
          fieldPosition: this.config.data?.value.fieldPosition,
          fieldCategory: FieldType.text_input,
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
}
