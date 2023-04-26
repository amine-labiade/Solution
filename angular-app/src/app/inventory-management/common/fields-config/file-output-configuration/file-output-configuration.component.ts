import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Constants } from 'src/app/common/constants';
import { FieldType } from 'src/app/common/field-type';
import { CreationProcessEditionService } from 'src/app/inventory-management/components/creation-process/creation-process-edition.service';
import Swal from 'sweetalert2';
import { FileOutputConfigurationPage } from '../../../models/fields/file-output/file-output-configuration-page';
import { ConfigurationMatcher } from '../../models/configuration-matcher';
import { FieldConfigurationSharingService } from '../../services/field-configuration-sharing.service';
import { FileOutputConfigurationEditionService } from './file-output-configuration-edition.service';

@Component({
  selector: 'app-file-output-configuration',
  templateUrl: './file-output-configuration.component.html',
  styleUrls: ['./file-output-configuration.component.css'],
})
export class FileOutputConfigurationComponent implements OnInit {
  pageObject: FileOutputConfigurationPage = new FileOutputConfigurationPage();

  configMatcher!: ConfigurationMatcher;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private creationProcessService: CreationProcessEditionService,
    private fileOutputConfigurationEdition: FileOutputConfigurationEditionService,
    private fieldConfigurationSharingService: FieldConfigurationSharingService
  ) {}

  async ngOnInit() {
    this.pageObject.dataSources =
      await this.creationProcessService.getDataSources();
    this.configMatcher = this.config.data?.value;
    if (this.configMatcher.fieldConfiguration) {
      this.pageObject.fieldResponse =
        this.configMatcher.fieldConfiguration.fieldResponse;
      switch (this.pageObject.fieldResponse.fileOutputType) {
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
    let result;
    this.pageObject.fieldConfiguration.label = value.labelInput;
    this.pageObject.fieldConfiguration.fileOutputType = value.typeInput;
    this.pageObject.fieldConfiguration.fileOutputExtension =
      value.extensionInput;
    this.pageObject.fieldConfiguration.position =
      this.config.data?.value.fieldPosition;
    this.pageObject.fieldConfiguration.fieldCategory =
      this.config.data?.value.fieldCategory;
    this.pageObject.fieldConfiguration.filePath = value.pathInput;
    result = this.fileOutputConfigurationEdition.validFormSourceless(
      this.pageObject.fieldConfiguration
    );

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
        fieldCategory: FieldType.file_output,
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
    let result;
    this.pageObject.fieldUpdated.id = this.pageObject.fieldResponse.id;
    this.pageObject.fieldUpdated.label = value.labelInput;
    this.pageObject.fieldUpdated.fileOutputType = value.typeInput;
    this.pageObject.fieldUpdated.fileOutputExtension = value.extensionInput;
    this.pageObject.fieldUpdated.position =
      this.config.data?.value.fieldPosition;
    this.pageObject.fieldUpdated.fieldCategory =
      this.config.data?.value.fieldCategory;
    this.pageObject.fieldUpdated.filePath = value.pathInput;
    result = this.fileOutputConfigurationEdition.validFormSourceless(
      this.pageObject.fieldUpdated
    );

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
        fieldCategory: FieldType.file_output,
      });
      if(this.pageObject.fieldResponse.id){
        this.pageObject.fieldResponse = {id : this.pageObject.fieldResponse.id, category : parseFloat(this.pageObject.fieldConfiguration.fieldCategory), ...this.pageObject.fieldConfiguration}
      }else{
        this.pageObject.fieldResponse = {id : "", category : parseFloat(this.pageObject.fieldConfiguration.fieldCategory), ...this.pageObject.fieldConfiguration}
      }      this.ref.close();
    }
  }
}
