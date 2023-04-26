import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { ChoiceButtonsConfigurationPage } from '../../../models/fields/choice-buttons/choice-buttons-configuration-page';
import { CreationProcessEditionService } from '../../../components/creation-process/creation-process-edition.service';
import { ChoiceButtonsConfigurationEditionService } from './choice-buttons-configuration-edition.service';
import { FieldConfigurationSharingService } from '../../services/field-configuration-sharing.service';
import { ConfigurationMatcher } from '../../models/configuration-matcher';
import { SelectListItemString } from 'src/app/common/select-list-item-string';
import { ChoiceButtonsType, FieldType } from 'src/app/common/field-type';

@Component({
  selector: 'app-choice-buttons-configuration',
  templateUrl: './choice-buttons-configuration.component.html',
  styleUrls: ['./choice-buttons-configuration.component.css'],
})
export class ChoiceButtonsConfigurationComponent implements OnInit {
  pageObject: ChoiceButtonsConfigurationPage =
    new ChoiceButtonsConfigurationPage();
  configMatcher!: ConfigurationMatcher;
  configuartionChoiceButtons!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private creationProcessService: CreationProcessEditionService,
    private choiceButtonsConfigurationEdition: ChoiceButtonsConfigurationEditionService,
    private fieldConfigurationSharingService: FieldConfigurationSharingService
  ) {}

  async ngOnInit() {
    this.configMatcher = this.config.data?.value;
    if (this.configMatcher.fieldConfiguration != null) {
      this.pageObject.fieldResponse =
        this.configMatcher.fieldConfiguration.fieldResponse;
    }
    this.configuartionChoiceButtons = this.fb.group({
      label: this.pageObject.fieldResponse.label,
      name: this.pageObject.fieldResponse.name,
      source: '',
      defaultValue: '',
      default: [0],
      isRequired: this.pageObject.fieldResponse.isRequired
        ? this.pageObject.fieldResponse.isRequired
        : false,
      values: this.fb.array([this.createValue()]),
    });
    if (this.pageObject.fieldResponse.dataSourceId) {
      this.configuartionChoiceButtons
        .get('source')
        ?.setValue(this.pageObject.fieldResponse.dataSourceId);
      for (let option of this.pageObject.fieldResponse.options) {
        let opt: SelectListItemString = new SelectListItemString();
        opt.value = option.referenceId;
        opt.label = option.value;
        if (option.isDefault === true) {
          this.pageObject.defaultValue = option.referenceId;
        }
        this.pageObject.optionsFromApi.push(opt);
      }
      this.configuartionChoiceButtons
        .get('defaultValue')
        ?.setValue(this.pageObject.defaultValue);
    } else {
      this.pageObject.selectedValueRadio = 'sourceless';
      let i = 0;
      if (Array.isArray(this.pageObject.fieldResponse.options)) {
        for (let option of this.pageObject.fieldResponse.options) {
          if (i === 0) {
            this.values().at(0).get('value')?.setValue(option.value);
          } else {
            this.values().push(this.createValueWithDefault(option.value));
          }
          if (option.isDefault === true) {
            this.default().setValue(i);
          }
          i++;
        }
      }
    }
    this.pageObject.dataSources =
      await this.creationProcessService.getDataSources();
  }
  /**
   * create new value in form form array
   * @returns form group
   */
  createValue(): FormGroup {
    return this.fb.group({
      value: '',
    });
  }

  createValueWithDefault(value: any): FormGroup {
    return this.fb.group({
      value: value,
    });
  }
  /**
   * get values  form group
   * @returns
   */
  values(): FormArray {
    return this.configuartionChoiceButtons.get('values') as FormArray;
  }

  /**
   * get default control from form group
   * @returns
   */
  default(): FormControl {
    return this.configuartionChoiceButtons.get('default') as FormControl;
  }

  /**
   * add new value in values
   */
  addValue(): void {
    this.values().push(this.createValue());
  }
  /**
   * remove value in values
   * @param i
   */
  removeValues(i: number) {
    this.values().removeAt(i);
  }

  /**
   * this function is called when dropdown of data source is clear
   * @param event
   */
  onClear(event: any) {
    this.pageObject.optionsFromApi = [];
    this.pageObject.defaultValue = null;
  }

  /**
   * detects datasource dropdown changes
   * @param event change event
   */
  async onChange(event: any) {
    if (event.value) {
      this.pageObject.optionsFromApi =
        await this.choiceButtonsConfigurationEdition.retrieveData(event.value);
    }
    this.pageObject.defaultValue = null;
  }

  /**
   * this function is used to retrieve data from the forms and send them
   * to the service for verification and registration in the database and
   * call the appropriate function
   */
  submitConfiguration() {
    if (this.pageObject.fieldResponse.id) {
      this.updateField();
    } else {
      this.createField();
    }
  }

  /**
   * this function is used to create new field
   */
  createField() {
    let result;
    this.pageObject.fieldConfiguration.name =
      this.configuartionChoiceButtons.get('name')?.value;
    this.pageObject.fieldConfiguration.label =
      this.configuartionChoiceButtons.get('label')?.value;
    if (this.configuartionChoiceButtons.get('isRequired')?.value == null) {
      this.pageObject.fieldConfiguration.isRequired = false;
    } else {
      this.pageObject.fieldConfiguration.isRequired =
        this.configuartionChoiceButtons.get('isRequired')?.value;
    }

    this.pageObject.fieldConfiguration.position =
      this.config.data?.value.fieldPosition;
    this.pageObject.fieldConfiguration.fieldCategory =
      this.config.data?.value.fieldCategory;
    if (
      this.pageObject.fieldConfiguration.fieldCategory ==
      FieldType.checkboxes.toString()
    ) {
      this.pageObject.fieldConfiguration.choiceButtonsType =
        ChoiceButtonsType.checkbox;
    } else {
      this.pageObject.fieldConfiguration.choiceButtonsType =
        ChoiceButtonsType.radio;
    }
    this.pageObject.fieldConfiguration.dataSourceId = null;
    if (this.pageObject.selectedValueRadio === 'withSource') {
      this.pageObject.fieldConfiguration.dataSourceId =
        this.configuartionChoiceButtons.get('source')?.value;

      this.pageObject.optionsFromApi.forEach((el, i) => {
        if (
          el.value ===
          this.configuartionChoiceButtons.get('defaultValue')?.value
        ) {
          this.pageObject.fieldConfiguration.options.push({
            value: el.label,
            isDefault: true,
            referenceId: el.value,
          });
        } else {
          this.pageObject.fieldConfiguration.options.push({
            value: el.label,
            isDefault: false,
            referenceId: el.value,
          });
        }
      });
      this.pageObject.fieldConfiguration.defaultValue =
        this.configuartionChoiceButtons.get('defaultValue')?.value;
      result = this.choiceButtonsConfigurationEdition.valideFormWithSource(
        this.pageObject.fieldConfiguration
      );
    } else {
      for (let i = 0; i < this.values().length; i++) {
        if (this.configuartionChoiceButtons.get('default')?.value === i) {
          this.pageObject.fieldConfiguration.defaultValue = this.values()
            .at(i)
            .get('value')?.value;
          this.pageObject.fieldConfiguration.options.push({
            value: this.values().at(i).get('value')?.value,
            isDefault: true,
          });
        } else {
          this.pageObject.fieldConfiguration.options.push({
            value: this.values().at(i).get('value')?.value,
            isDefault: false,
          });
        }
      }
      result = this.choiceButtonsConfigurationEdition.valideFormSourceless(
        this.pageObject.fieldConfiguration
      );
    }

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
        fieldCategory: this.config.data?.value.fieldCategory,
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
   * this function is used to update field
   */
  updateField() {
    let result;
    this.pageObject.fieldUpdated.name =
      this.configuartionChoiceButtons.get('name')?.value;
    this.pageObject.fieldUpdated.label =
      this.configuartionChoiceButtons.get('label')?.value;
    if (this.configuartionChoiceButtons.get('isRequired')?.value == null) {
      this.pageObject.fieldUpdated.isRequired = false;
    } else {
      this.pageObject.fieldUpdated.isRequired =
        this.configuartionChoiceButtons.get('isRequired')?.value;
    }
    this.pageObject.fieldUpdated.position =
      this.config.data?.value.fieldPosition;
    this.pageObject.fieldUpdated.fieldCategory =
      this.config.data?.value.fieldCategory;
    this.pageObject.fieldUpdated.dataSourceId = null;
    if (
      this.pageObject.fieldUpdated.fieldCategory ==
      FieldType.checkboxes.toString()
    ) {
      this.pageObject.fieldUpdated.choiceButtonsType =
        ChoiceButtonsType.checkbox;
    } else {
      this.pageObject.fieldUpdated.choiceButtonsType = ChoiceButtonsType.radio;
    }
    if (this.pageObject.selectedValueRadio === 'withSource') {
      this.pageObject.fieldUpdated.dataSourceId =
        this.configuartionChoiceButtons.get('source')?.value;
      this.pageObject.optionsFromApi.forEach((el, i) => {
        if (
          el.value ===
          this.configuartionChoiceButtons.get('defaultValue')?.value
        ) {
          this.pageObject.fieldUpdated.options.push({
            value: el.label,
            isDefault: true,
            referenceId: el.value,
          });
        } else {
          this.pageObject.fieldUpdated.options.push({
            value: el.label,
            isDefault: false,
            referenceId: el.value,
          });
        }
      });
      this.pageObject.fieldUpdated.defaultValue =
        this.configuartionChoiceButtons.get('defaultValue')?.value;
      result = this.choiceButtonsConfigurationEdition.valideFormWithSource(
        this.pageObject.fieldUpdated
      );
    } else {
      for (let i = 0; i < this.values().length; i++) {
        if (this.configuartionChoiceButtons.get('default')?.value === i) {
          this.pageObject.fieldConfiguration.defaultValue = this.values()
            .at(i)
            .get('value')?.value;
          this.pageObject.fieldUpdated.options.push({
            value: this.values().at(i).get('value')?.value,
            isDefault: true,
          });
        } else {
          this.pageObject.fieldUpdated.options.push({
            value: this.values().at(i).get('value')?.value,
            isDefault: false,
          });
        }
      }
      result = this.choiceButtonsConfigurationEdition.valideFormSourceless(
        this.pageObject.fieldUpdated
      );
    }

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
        fieldCategory: this.config.data?.value.fieldCategory,
      });
      this.pageObject.fieldResponse = {
        id: '',
        category: parseFloat(this.pageObject.fieldConfiguration.fieldCategory),
        ...this.pageObject.fieldConfiguration,
      };

      if(this.pageObject.fieldResponse.id){
        this.pageObject.fieldResponse = {id : this.pageObject.fieldResponse.id, category : parseFloat(this.pageObject.fieldConfiguration.fieldCategory), ...this.pageObject.fieldConfiguration}
      }else{
        this.pageObject.fieldResponse = {id : "", category : parseFloat(this.pageObject.fieldConfiguration.fieldCategory), ...this.pageObject.fieldConfiguration}
      }
      this.ref.close();
    }
  }
}
