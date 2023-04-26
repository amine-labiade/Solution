import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Constants } from 'src/app/common/constants';
import { FieldType } from 'src/app/common/field-type';
import { StateOfValidationForm } from 'src/app/common/state-of-validation-form.enum';
import { FileInputConfigurationPage } from 'src/app/inventory-management/models/fields/file-input/file-input-configuration-page';
import Swal from 'sweetalert2';
import { ConfigurationMatcher } from '../../models/configuration-matcher';
import { FieldConfigurationSharingService } from '../../services/field-configuration-sharing.service';
import { FileInputConfigurationEditionService } from './file-input-configuration-edition.service';

@Component({
  selector: 'app-file-input-configuration',
  templateUrl: './file-input-configuration.component.html',
  styleUrls: ['./file-input-configuration.component.css'],
})
export class FileInputConfigurationComponent implements OnInit {
  pageObject: FileInputConfigurationPage = new FileInputConfigurationPage();

  configMatcher!: ConfigurationMatcher;
  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private fileInputConfigurationEdition: FileInputConfigurationEditionService,
    private fieldConfigurationSharingService: FieldConfigurationSharingService
  ) {}

  ngOnInit() {
    this.configMatcher = this.config.data?.value;
    if (this.configMatcher.fieldConfiguration) {
      this.pageObject.fieldResponse =
        this.configMatcher.fieldConfiguration.fieldResponse;
      switch (this.pageObject.fieldResponse.fileInputtype) {
        case Constants.imageType:
          this.pageObject.extensions = Constants.extensionImage;
          break;
        case Constants.documentType:
          this.pageObject.extensions = Constants.extensionDocuments;
          break;
        case Constants.videoType:
          this.pageObject.extensions = Constants.extensionVideos;
          break;
      }
    }
  }

  /**
   * this function is used to display the extensions according to the types of files
   * @param event
   */
  displayListExtension(event: any) {
    switch (event.value) {
      case 'Image':
        this.pageObject.extensions = Constants.extensionImage;
        break;
      case 'Document':
        this.pageObject.extensions = Constants.extensionDocuments;
        break;
      case 'Vidéo':
        this.pageObject.extensions = Constants.extensionVideos;
        break;
      default:
        this.pageObject.extensions = [];
        break;
    }
  }

  /**
   * this function is used to create new field
   * @param value
   */
  createField(value: any) {
    this.pageObject.fieldConfiguration.label = value.labelInput;
    this.pageObject.fieldConfiguration.name = value.nameInput;
    this.pageObject.fieldConfiguration.fileInputtype = value.typeInput;
    this.pageObject.fieldConfiguration.fileInputExtension =
      value.extensionInput;
    this.pageObject.fieldConfiguration.minSize = value.minSizeInput;
    this.pageObject.fieldConfiguration.maxSize = value.maxSizeInput;
    this.pageObject.fieldConfiguration.position =
      this.config.data?.value.fieldPosition;
    this.pageObject.fieldConfiguration.fieldCategory =
      this.config.data?.value.fieldCategory;
    if (!value.isRequiredCheck) {
      this.pageObject.fieldConfiguration.isRequired = false;
    } else {
      this.pageObject.fieldConfiguration.isRequired = value.isRequiredCheck;
    }
    let result = this.fileInputConfigurationEdition.validForm(
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
      if (result === StateOfValidationForm.minMaxNotValid) {
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
          fieldCategory: FieldType.file_input,
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
    this.pageObject.fieldUpdated.fileInputtype = value.typeInput;
    this.pageObject.fieldUpdated.fileInputExtension = value.extensionInput;
    this.pageObject.fieldUpdated.minSize = value.minSizeInput;
    this.pageObject.fieldUpdated.maxSize = value.maxSizeInput;
    this.pageObject.fieldUpdated.position =
      this.config.data?.value.fieldPosition;
    this.pageObject.fieldUpdated.fieldCategory =
      this.config.data?.value.fieldCategory;
    if (!value.isRequiredCheck) {
      this.pageObject.fieldUpdated.isRequired = false;
    } else {
      this.pageObject.fieldUpdated.isRequired = value.isRequiredCheck;
    }
    let result = this.fileInputConfigurationEdition.validForm(
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
      if (result === StateOfValidationForm.minMaxNotValid) {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Careful, min is bigger than max!!',
          confirmButtonText: 'Close',
          confirmButtonColor: '#1F7ACE',
        });
      } else {
        this.pageObject.fieldConfiguration = {
          ...this.pageObject.fieldUpdated,
        };
        this.configMatcher = this.config.data?.value;
        this.fieldConfigurationSharingService.updateConfiguration({
          configuration: this.pageObject,
          fieldPosition: this.config.data?.value.fieldPosition,
          fieldCategory: FieldType.file_input,
        });
        if (this.pageObject.fieldResponse.id) {
          this.pageObject.fieldResponse = {
            id: '',
            category: parseFloat(
              this.pageObject.fieldConfiguration.fieldCategory
            ),
            ...this.pageObject.fieldConfiguration,
          };
        }

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
}
