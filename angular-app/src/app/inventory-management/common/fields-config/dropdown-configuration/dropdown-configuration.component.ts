import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  DynamicDialogRef,
  DialogService,
  DynamicDialogConfig,
} from 'primeng/dynamicdialog';
import { FieldType } from 'src/app/common/field-type';
import { SelectListItem } from 'src/app/common/select-list-item';
import { SelectListItemString } from 'src/app/common/select-list-item-string';
import { CreationProcessEditionService } from 'src/app/inventory-management/components/creation-process/creation-process-edition.service';
import Swal from 'sweetalert2';
import { DropdownConfigurationPage } from '../../../models/fields/dropdown/dropdown-configuration-page';
import { ConfigurationMatcher } from '../../models/configuration-matcher';
import { FieldConfigurationSharingService } from '../../services/field-configuration-sharing.service';

import { DropdownConfigurationEditionService } from './dropdown-configuration-edition.service';

@Component({
  selector: 'app-dropdown-configuration',
  templateUrl: './dropdown-configuration.component.html',
  styleUrls: ['./dropdown-configuration.component.css'],
  providers: [],
})
export class DropdownConfigurationComponent implements OnInit {
  pageObject: DropdownConfigurationPage = new DropdownConfigurationPage();
  configuartionDropdownForm!: FormGroup;
  configMatcher!: ConfigurationMatcher;

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private creationProcessService: CreationProcessEditionService,
    private dropdownConfigurationEdition: DropdownConfigurationEditionService,
    private fieldConfigurationSharingService: FieldConfigurationSharingService
  ) {}

  async ngOnInit() {
    this.configMatcher = this.config.data?.value;
    console.log(this.configMatcher);
    console.log(this.pageObject);
    if (this.configMatcher.fieldConfiguration != null) {
      this.pageObject.fieldResponse =
        this.configMatcher.fieldConfiguration.fieldResponse;
    }
    this.configuartionDropdownForm = this.fb.group({
      label: this.pageObject.fieldResponse.label,
      name: this.pageObject.fieldResponse.name,
      source: '',
      default: [0],
      isRequired: this.pageObject.fieldResponse.isRequired
        ? this.pageObject.fieldResponse.isRequired
        : false,
      isMultiselect: this.pageObject.fieldResponse.isMultiselect
        ? this.pageObject.fieldResponse.isMultiselect
        : false,
      defaultValue: '',
      values: this.fb.array([this.createValue()]),
    });
    if (this.pageObject.fieldResponse.dataSourceId) {
      this.configuartionDropdownForm
        .get('source')
        ?.setValue(this.pageObject.fieldResponse.dataSourceId);
      if (Array.isArray(this.pageObject.fieldResponse.options)) {
        for (let option of this.pageObject.fieldResponse.options) {
          let opt: SelectListItemString = new SelectListItemString();
          opt.value = option.referenceId;
          opt.label = option.value;
          if (option.isDefault === true) {
            this.pageObject.defaultValue = option.referenceId;
          }
          this.pageObject.optionsFromApi.push(opt);
        }
      }
      this.configuartionDropdownForm
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
        this.configuartionDropdownForm
          .get('defaultValue')
          ?.setValue(this.pageObject.defaultValue);
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
    return this.configuartionDropdownForm.get('values') as FormArray;
  }
  /**
   * get default control from form group
   * @returns
   */
  default(): FormControl {
    return this.configuartionDropdownForm.get('default') as FormControl;
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
   * detects datasource dropdown changes
   * @param event change event
   */
  async onChange(event: any) {
    if (event.value) {
      this.pageObject.optionsFromApi =
        await this.dropdownConfigurationEdition.retrieveData(event.value);
    }
    this.pageObject.defaultValue = null;
  }

  /**
   * this function is called when the source is changed then
   * the list of options must be changed and also the default option
   * @param event
   */
  /*async onChange(event: any) {
    this.pageObject.optionsFromApi =
      await this.dropdownConfigurationEdition.getDataFromExternalApi(
        event.value
      );
    this.pageObject.defaultValue = null;
  }*/
  /**
   * this function is called when dropdown of data source is clear
   * @param event
   */
  onClear(event: any) {
    this.pageObject.optionsFromApi = [];
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
      console.log('dkhlt hna');
      this.createField();
    }
  }

  /**
   * this function is used to create new field
   */
  createField() {
    let result;
    this.pageObject.fieldConfiguration.name =
      this.configuartionDropdownForm.get('name')?.value;
    this.pageObject.fieldConfiguration.label =
      this.configuartionDropdownForm.get('label')?.value;
    if (this.configuartionDropdownForm.get('isRequired')?.value == null) {
      this.pageObject.fieldConfiguration.isRequired = false;
    } else {
      this.pageObject.fieldConfiguration.isRequired =
        this.configuartionDropdownForm.get('isRequired')?.value;
    }
    if (this.configuartionDropdownForm.get('isMultiselect')?.value == null) {
      this.pageObject.fieldConfiguration.isMultiselect = false;
    } else {
      this.pageObject.fieldConfiguration.isMultiselect =
        this.configuartionDropdownForm.get('isMultiselect')?.value;
    }
    this.pageObject.fieldConfiguration.position =
      this.config.data?.value.fieldPosition;
    this.pageObject.fieldConfiguration.fieldCategory =
      this.config.data?.value.fieldCategory;
    this.pageObject.fieldConfiguration.dataSourceId = null;
    if (this.pageObject.selectedValueRadio === 'withSource') {
      this.pageObject.fieldConfiguration.dataSourceId =
        this.configuartionDropdownForm.get('source')?.value;
      this.pageObject.optionsFromApi.forEach((el, i) => {
        if (
          el.value === this.configuartionDropdownForm.get('defaultValue')?.value
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
        this.configuartionDropdownForm.get('defaultValue')?.value;
      result = this.dropdownConfigurationEdition.valideFormWithSource(
        this.pageObject.fieldConfiguration
      );
    } else {
      for (let i = 0; i < this.values().length; i++) {
        if (this.configuartionDropdownForm.get('default')?.value === i) {
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
      console.log(this.pageObject.fieldConfiguration);
      result = this.dropdownConfigurationEdition.valideFormSourceless(
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
        fieldCategory: FieldType.dropdown,
      });
      if (this.pageObject.fieldResponse.id) {
        this.pageObject.fieldResponse = {
          id: this.pageObject.fieldResponse.id,
          category: parseFloat(
            this.pageObject.fieldConfiguration.fieldCategory
          ),
          ...this.pageObject.fieldConfiguration,
        };
      } else {
        this.pageObject.fieldResponse = {
          id: '',
          category: parseFloat(
            this.pageObject.fieldConfiguration.fieldCategory
          ),
          ...this.pageObject.fieldConfiguration,
        };
      }
      this.ref.close();
    }
  }

  /**
   * this function is used to update field
   */
  updateField() {
    let result;
    this.pageObject.fieldUpdated.id = this.pageObject.fieldResponse.id;
    this.pageObject.fieldUpdated.name =
      this.configuartionDropdownForm.get('name')?.value;
    this.pageObject.fieldUpdated.label =
      this.configuartionDropdownForm.get('label')?.value;
    if (this.configuartionDropdownForm.get('isRequired')?.value == null) {
      this.pageObject.fieldUpdated.isRequired = false;
    } else {
      this.pageObject.fieldUpdated.isRequired =
        this.configuartionDropdownForm.get('isRequired')?.value;
    }
    if (this.configuartionDropdownForm.get('isMultiselect')?.value == null) {
      this.pageObject.fieldUpdated.isMultiselect = false;
    } else {
      this.pageObject.fieldUpdated.isMultiselect =
        this.configuartionDropdownForm.get('isMultiselect')?.value;
    }
    this.pageObject.fieldUpdated.position =
      this.config.data?.value.fieldPosition;
    this.pageObject.fieldUpdated.fieldCategory =
      this.config.data?.value.fieldCategory;
    this.pageObject.fieldUpdated.dataSourceId = null;
    if (this.pageObject.selectedValueRadio === 'withSource') {
      this.pageObject.fieldUpdated.dataSourceId =
        this.configuartionDropdownForm.get('source')?.value;
      this.pageObject.optionsFromApi.forEach((el, i) => {
        if (
          el.value === this.configuartionDropdownForm.get('defaultValue')?.value
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
        this.configuartionDropdownForm.get('defaultValue')?.value;
      result = this.dropdownConfigurationEdition.valideFormWithSource(
        this.pageObject.fieldUpdated
      );
    } else {
      for (let i = 0; i < this.values().length; i++) {
        if (this.configuartionDropdownForm.get('default')?.value === i) {
          this.pageObject.fieldUpdated.defaultValue = this.values()
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
      result = this.dropdownConfigurationEdition.valideFormSourceless(
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
      this.pageObject.fieldConfiguration = { ...this.pageObject.fieldUpdated };
      this.configMatcher = this.config.data?.value;
      this.fieldConfigurationSharingService.updateConfiguration({
        configuration: this.pageObject,
        fieldPosition: this.config.data?.value.fieldPosition,
        fieldCategory: FieldType.dropdown,
      });

      if (this.pageObject.fieldResponse.id) {
        this.pageObject.fieldResponse = {
          id: this.pageObject.fieldResponse.id,
          category: parseFloat(
            this.pageObject.fieldConfiguration.fieldCategory
          ),
          ...this.pageObject.fieldConfiguration,
        };
      } else {
        this.pageObject.fieldResponse = {
          id: '',
          category: parseFloat(
            this.pageObject.fieldConfiguration.fieldCategory
          ),
          ...this.pageObject.fieldConfiguration,
        };
      }
      this.ref.close();
    }
  }
}
