import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderTitleService } from 'src/app/layout/components/header/header-title.service';

import {
  faCheckSquare,
  faCheckCircle,
  faFileUpload,
  faCircleArrowDown,
  faFile,
  faSliders,
  faCalendarDay,
  faFileText,
  faT,
  faExternalLink,
} from '@fortawesome/free-solid-svg-icons';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Constants } from 'src/app/common/constants';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TextInputConfigurationComponent } from '../../common/fields-config/text-input-configuration/text-input-configuration.component';
import { FileInputConfigurationComponent } from '../../common/fields-config/file-input-configuration/file-input-configuration.component';
import { TextOutputConfigurationComponent } from '../../common/fields-config/text-output-configuration/text-output-configuration.component';
import { SliderConfigurationComponent } from '../../common/fields-config/slider-configuration/slider-configuration.component';
import { LinkConfigurationComponent } from '../../common/fields-config/link-configuration/link-configuration.component';
import { FileOutputConfigurationComponent } from '../../common/fields-config/file-output-configuration/file-output-configuration.component';
import { DropdownConfigurationComponent } from '../../common/fields-config/dropdown-configuration/dropdown-configuration.component';
import { ChoiceButtonsConfigurationComponent } from '../../common/fields-config/choice-buttons-configuration/choice-buttons-configuration.component';
import {
  ChoiceButtonsType,
  FieldType,
  InputFieldType,
  OutputFieldType,
} from 'src/app/common/field-type';
import { ConfigurationMatcher } from '../../common/models/configuration-matcher';
import { StepPage } from '../../models/step/step-page';
import { StepEditionService } from './step-edition.service';
import { FieldConfiguration } from '../../common/models/field-configuration';
import { FieldConfigurationSharingService } from '../../common/services/field-configuration-sharing.service';
import { ProcessStepDataSharingService } from '../../common/services/process-step-data-sharing.service';
import { StepResponse } from '../../models/step/step-response';
import { MessageService } from 'primeng/api';
import { ChoiceButtonsConfigurationPage } from '../../models/fields/choice-buttons/choice-buttons-configuration-page';
import { DropdownConfigurationPage } from '../../models/fields/dropdown/dropdown-configuration-page';
import { FileInputConfigurationPage } from '../../models/fields/file-input/file-input-configuration-page';
import { FileOutputConfigurationPage } from '../../models/fields/file-output/file-output-configuration-page';
import { LinkOutputConfigurationPage } from '../../models/fields/link-output/link-output-configuration-page';
import { SliderConfigurationPage } from '../../models/fields/slider/slider-configuration-page';
import { TextInputConfigurationPage } from '../../models/fields/text-input/text-input-configuration-page';
import { TextOutputConfigurationPage } from '../../models/fields/text-output/text-output-configuration-page';
import { DateInputConfigurationComponent } from '../../common/fields-config/date-input-configuration/date-input-configuration.component';
import { DateInputConfigurationPage } from '../../models/fields/date-input/date-input-configuration-page';
import { SliderQuery } from '../../models/fields/slider/slider-query';
import { DropdownQuery } from '../../models/fields/dropdown/dropdown-query';
import { FileInputQuery } from '../../models/fields/file-input/file-input-query';
import { FileOutputQuery } from '../../models/fields/file-output/file-output-query';
import { ChoiceButtonsQuery } from '../../models/fields/choice-buttons/choice-buttons-query';
import { DateInputQuery } from '../../models/fields/date-input/date-input-query';
import { TextInputQuery } from '../../models/fields/text-input/text-input-query';
import { TextOutputQuery } from '../../models/fields/text-output/text-output-query';
import { LinkOutputQuery } from '../../models/fields/link-output/link-output-query';

@Component({
  selector: 'app-creation-step',
  templateUrl: './step-creation.component.html',
  providers: [DialogService, DynamicDialogRef],
  styleUrls: ['./step-creation.component.css'],
})
export class StepCreationComponent implements OnInit {
  // declaration of font awesome icons used in this interface
  faCheckSquare = faCheckSquare;
  faCheckCircle = faCheckCircle;
  faFileUpload = faFileUpload;
  faCircleArrowDown = faCircleArrowDown;
  faFile = faFile;
  faSliders = faSliders;
  faCalendarDay = faCalendarDay;
  faFileText = faFileText;
  faT = faT;
  faExternalLink = faExternalLink;

  fieldType: typeof FieldType = FieldType;
  inputFieldType: typeof InputFieldType = InputFieldType;
  outputFieldType: typeof OutputFieldType = OutputFieldType;

  inputFields: Array<string> = Object.keys(InputFieldType).splice(
    0,
    Object.keys(InputFieldType).length / 2
  );
  outputFields: Array<string> = Object.keys(OutputFieldType).splice(
    0,
    Object.keys(OutputFieldType).length / 2
  );
  availableFields: Array<string> = Object.keys(FieldType).splice(
    0,
    Object.keys(FieldType).length / 2
  );

  _inputFields = [...Array(this.inputFields.length)].map((_, i) => [
    'input',
    this.inputFields[i],
  ]);
  _outputFields = [...Array(this.outputFields.length)].map((_, i) => [
    'output',
    this.outputFields[i],
  ]);

  droppedFields: Array<string> = [];
  stepFields: Array<FieldConfiguration> = [];

  pageObject: StepPage = new StepPage();

  constructor(
    private headerTitleService: HeaderTitleService,
    public dialogService: DialogService,
    public ref: DynamicDialogRef,
    private stepEditionService: StepEditionService,
    private fieldConfigurationSharingService: FieldConfigurationSharingService,
    private processStepDataSharingService: ProcessStepDataSharingService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.pageObject.creationMode =
      this.router.getCurrentNavigation()?.extras?.state?.['isCreationMode'];
    this.pageObject.creationProcessMode =
      this.router.getCurrentNavigation()?.extras?.state?.['isCreationPocess'];
    this.pageObject.idStepToGet =
      this.router.getCurrentNavigation()?.extras?.state?.['step'];
    this.pageObject.idProcessToGet =
      this.router.getCurrentNavigation()?.extras?.state?.['process'];
  }

  async ngOnInit() {
    //creation
    if (this.pageObject.creationMode) {
      this.headerTitleService.setTitle(Constants.step_creation_title_en);
    } else {
      this.headerTitleService.setTitle(Constants.step_modification_title_en);
      this.pageObject.stepToDisplay = await this.stepEditionService.getStepById(
        this.pageObject.idStepToGet
      );
      console.log(this.pageObject.stepToDisplay);
      this.pageObject.possiblePreviousStepsFromBack =
        await this.stepEditionService.getStepsWithoutNext(
          this.pageObject.idProcessToGet,
          this.pageObject.stepToDisplay.previousStepId,
          this.pageObject.idStepToGet
        );
      if (this.pageObject.stepToDisplay.previousStepId != null) {
        this.pageObject.selectedPreviousStep =
          this.pageObject.possiblePreviousStepsFromBack[
            this.pageObject.possiblePreviousStepsFromBack.length - 1
          ];
      }
      for (let field of this.pageObject.stepToDisplay.fields) {
        this.droppedFields.push(field.category);
        let fieldConfig: FieldConfiguration = new FieldConfiguration();
        fieldConfig.fieldCategory = field.category;
        fieldConfig.fieldPosition = field.position;
        switch (field.category) {
          case FieldType.dropdown:
            fieldConfig.configuration = new DropdownConfigurationPage();
            fieldConfig.configuration.fieldResponse.label = field.label;
            fieldConfig.configuration.fieldResponse.name = field.name;
            fieldConfig.configuration.fieldResponse.id = field.id;
            fieldConfig.configuration.fieldResponse.isRequired =
              field.isRequired;
            fieldConfig.configuration.fieldResponse.options = field.options;
            fieldConfig.configuration.fieldResponse.dataSourceId =
              field.dataSource?.id;
            fieldConfig.configuration.fieldResponse.isMultiselect =
              field.isMultiselect;
            fieldConfig.configuration.fieldResponse.category = field.category;
            fieldConfig.configuration.fieldConfiguration = {
              ...field,
            } as DropdownQuery;
            break;
          case FieldType.file_input:
            fieldConfig.configuration = new FileInputConfigurationPage();
            fieldConfig.configuration.fieldResponse.label = field.label;
            fieldConfig.configuration.fieldResponse.name = field.name;
            fieldConfig.configuration.fieldResponse.id = field.id;
            fieldConfig.configuration.fieldResponse.isRequired =
              field.isRequired;
            fieldConfig.configuration.fieldResponse.maxSize = field.maxSize;
            fieldConfig.configuration.fieldResponse.minSize = field.minSize;
            fieldConfig.configuration.fieldResponse.fileInputExtension =
              field.extension;
            fieldConfig.configuration.fieldResponse.fileInputtype = field.type;
            fieldConfig.configuration.fieldResponse.category = field.category;
            fieldConfig.configuration.fieldConfiguration = {
              fileInputType: field.type,
              fileInputExtension: field.extension,
              ...field,
            } as FileInputQuery;
            console.log(fieldConfig.configuration.fieldResponse);
            break;
          case FieldType.file_output:
            fieldConfig.configuration = new FileOutputConfigurationPage();
            fieldConfig.configuration.fieldResponse.label = field.label;
            fieldConfig.configuration.fieldResponse.id = field.id;
            fieldConfig.configuration.fieldResponse.filePath = field.filePath;
            fieldConfig.configuration.fieldResponse.fileOutputType = field.type;
            fieldConfig.configuration.fieldResponse.fileOutputExtension =
              field.extension;
            fieldConfig.configuration.fieldResponse.category = field.category;
            fieldConfig.configuration.fieldConfiguration = {
              fileOutputType: field.type,
              fileOutputExtension: field.extension,
              ...field,
            } as FileOutputQuery;
            break;
          case FieldType.link_output:
            fieldConfig.configuration = new LinkOutputConfigurationPage();
            fieldConfig.configuration.fieldResponse.label = field.label;
            fieldConfig.configuration.fieldResponse.id = field.id;
            fieldConfig.configuration.fieldResponse.displayName =
              field.displayName;
            fieldConfig.configuration.fieldResponse.url = field.url;
            fieldConfig.configuration.fieldResponse.category = field.category;
            fieldConfig.configuration.fieldConfiguration = {
              ...field,
            } as LinkOutputQuery;
            break;
          case FieldType.slider:
            fieldConfig.configuration = new SliderConfigurationPage();
            fieldConfig.configuration.fieldResponse.label = field.label;
            fieldConfig.configuration.fieldResponse.name = field.name;
            fieldConfig.configuration.fieldResponse.id = field.id;
            fieldConfig.configuration.fieldResponse.isRequired =
              field.isRequired;
            fieldConfig.configuration.fieldResponse.min = field.min;
            fieldConfig.configuration.fieldResponse.max = field.max;
            fieldConfig.configuration.fieldResponse.category = field.category;
            fieldConfig.configuration.fieldConfiguration = {
              sliderMin: field.min,
              sliderMax: field.max,
              ...field,
            } as SliderQuery;
            break;
          case FieldType.text_input:
            fieldConfig.configuration = new TextInputConfigurationPage();
            fieldConfig.configuration.fieldResponse.label = field.label;
            fieldConfig.configuration.fieldResponse.name = field.name;
            fieldConfig.configuration.fieldResponse.id = field.id;
            fieldConfig.configuration.fieldResponse.isRequired =
              field.isRequired;
            fieldConfig.configuration.fieldResponse.validationRegex =
              field.validationRegex;
            fieldConfig.configuration.fieldResponse.placeholder =
              field.placeholder;
            fieldConfig.configuration.fieldResponse.textInputMin = field.min;
            fieldConfig.configuration.fieldResponse.textInputMax = field.max;
            fieldConfig.configuration.fieldResponse.textInputType = field.type;
            fieldConfig.configuration.fieldResponse.category = field.category;
            fieldConfig.configuration.fieldConfiguration = {
              textInputType: field.type,
              textInputMax: field.max,
              textInputMin: field.min,
              ...field,
            } as TextInputQuery;
            break;
          case FieldType.text_output:
            fieldConfig.configuration = new TextOutputConfigurationPage();
            fieldConfig.configuration.fieldResponse.label = field.label;
            fieldConfig.configuration.fieldResponse.id = field.id;
            fieldConfig.configuration.fieldResponse.value = field.value;
            fieldConfig.configuration.fieldResponse.category = field.category;
            fieldConfig.configuration.fieldConfiguration = {
              ...field,
            } as TextOutputQuery;
            break;
          case FieldType.date_input:
            fieldConfig.configuration = new DateInputConfigurationPage();
            fieldConfig.configuration.fieldResponse.label = field.label;
            fieldConfig.configuration.fieldResponse.name = field.name;
            fieldConfig.configuration.fieldResponse.id = field.id;
            fieldConfig.configuration.fieldResponse.isRequired =
              field.isRequired;
            fieldConfig.configuration.fieldResponse.minDate = new Date(
              field.minDate
            );
            fieldConfig.configuration.fieldResponse.maxDate = new Date(
              field.maxDate
            );
            fieldConfig.configuration.fieldResponse.category = field.category;
            fieldConfig.configuration.fieldConfiguration = {
              minDate: field.minDate as Date,
              maxDate: field.maxDate as Date,
              ...field,
            } as DateInputQuery;
            break;
          default:
            fieldConfig.configuration = new ChoiceButtonsConfigurationPage();
            fieldConfig.configuration.fieldResponse.label = field.label;
            fieldConfig.configuration.fieldResponse.name = field.name;
            fieldConfig.configuration.fieldResponse.id = field.id;
            fieldConfig.configuration.fieldResponse.isRequired =
              field.isRequired;
            fieldConfig.configuration.fieldResponse.options = field.options;
            fieldConfig.configuration.fieldResponse.category = field.category;
            fieldConfig.configuration.fieldResponse.dataSourceId =
              field.dataSource?.id;
            fieldConfig.configuration.fieldConfiguration = {
              choiceButtonsType: ChoiceButtonsType.radio,
              ...field,
            } as ChoiceButtonsQuery;
            break;
        }
        this.stepFields.push(fieldConfig);
      }
    }
    this.pageObject.subscription =
      this.processStepDataSharingService.currentProcessSteps.subscribe(
        (pSteps) => {
          this.pageObject.processSteps = pSteps;
          for (let s of pSteps) {
            if (s.nextInventoryStepName === null) {
              this.pageObject.possiblePreviousSteps.push(s);
            }
          }
        }
      );
    this.pageObject.possiblePreviousStepsTotal =
      this.pageObject.possiblePreviousSteps.concat(
        this.pageObject.possiblePreviousStepsFromBack
      );

    setTimeout(() => {
      for (let i = 0; i < this.stepFields.length; i++) {
        this.fieldConfigurationSharingService.updateConfiguration(
          this.stepFields[i]
        );
      }
    }, 250);
  }

  /**
   * Handles logic of drag and drop of the fields from the side panel and from the canvas where fields are dropped
   * It also handles logic to update configuration of fields
   */
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      moveItemInArray(this.stepFields, event.previousIndex, event.currentIndex);
      if (this.stepFields[event.previousIndex].configuration != null) {
        this.stepFields[event.previousIndex].fieldPosition =
          event.previousIndex;
        this.stepFields[
          event.previousIndex
        ].configuration.fieldConfiguration.position = event.previousIndex;
      } else {
        this.stepFields[event.previousIndex].fieldPosition =
          event.previousIndex;
      }
      if (this.stepFields[event.currentIndex].configuration != null) {
        this.stepFields[event.currentIndex].fieldPosition = event.currentIndex;
        this.stepFields[
          event.currentIndex
        ].configuration.fieldConfiguration.position = event.currentIndex;
      } else {
        this.stepFields[event.currentIndex].fieldPosition = event.currentIndex;
      }
      this.fieldConfigurationSharingService.updateConfiguration(
        this.stepFields[event.previousIndex]
      );
      this.fieldConfigurationSharingService.updateConfiguration(
        this.stepFields[event.currentIndex]
      );
    } else {
      this.droppedFields.splice(
        event.currentIndex,
        0,
        event.previousContainer.data[event.previousIndex]
      );
      this.stepFields.splice(event.currentIndex, 0, {
        configuration: null,
        fieldPosition: event.currentIndex,
        fieldCategory: parseFloat(
          event.previousContainer.data[event.previousIndex]
        ),
      });
      for (let i = 0; i < this.stepFields.length; i++) {
        if (this.stepFields[i].configuration != null) {
          this.stepFields[i].fieldPosition = i;
          this.stepFields[i].configuration.fieldConfiguration.position = i;
          this.fieldConfigurationSharingService.updateConfiguration(
            this.stepFields[i]
          );
        } else {
          this.stepFields[i].fieldPosition = i;
          this.fieldConfigurationSharingService.updateConfiguration(
            this.stepFields[i]
          );
        }
      }
    }
  }

  /**
   * Removes the field whose trash action was clicked (trash icon)
   * @param value is the id of the field in the dropped fields list in the step
   */
  removeField(value: number) {
    this.droppedFields.splice(value, 1);
    this.stepFields.splice(value, 1);
    for (let i = 0; i < this.stepFields.length; i++) {
      if (this.stepFields[i].configuration != null) {
        this.stepFields[i].configuration.fieldConfiguration.position = i;
        this.stepFields[i].fieldPosition = i;
        this.fieldConfigurationSharingService.updateConfiguration(
          this.stepFields[i]
        );
      } else {
        this.stepFields[i].fieldPosition = i;
        this.fieldConfigurationSharingService.updateConfiguration(
          this.stepFields[i]
        );
      }
    }
  }
  /**
   * Submitting step data to database and sending it to a service for sharing data between process and step components
   * @param value
   */
  submitDataStep(value: any) {
    if (!this.pageObject.creationMode) {
      this.updateStep(value);
    } else {
      this.createStep(value);
    }
  }

  async updateStep(value: any) {
    this.pageObject.stepUpdate.id = this.pageObject.idStepToGet;
    this.pageObject.stepUpdate.description = value.descriptionInput;
    this.pageObject.stepUpdate.name = value.nameStepInput;
    this.pageObject.stepUpdate.previousStepId =
      this.pageObject.selectedPreviousStep?.id;
    console.log(this.stepFields);
    this.stepFields.forEach((el, _) => {
      if (el.configuration.fieldUpdated.id != null) {
        console.log('dkhl l fieldUpdated');
        this.pageObject.stepUpdate.stepFields.push({
          category: parseFloat(el.configuration.fieldUpdated.fieldCategory),
          ...el.configuration.fieldUpdated,
        });
      } else {
        if (el.configuration.fieldResponse.id != null) {
          if (el.configuration.fieldResponse.id == '') {
            el.configuration.fieldResponse.id = null;
          }
          this.pageObject.stepUpdate.stepFields.push({
            category: parseFloat(el.configuration.fieldResponse.category),
            ...el.configuration.fieldResponse,
          });
        } else {
          console.log('dkhlt l fieldConfiguration');
          this.pageObject.stepUpdate.stepFields.push({
            category: parseFloat(
              el.configuration.fieldConfiguration.fieldCategory
            ),
            ...el.configuration.fieldConfiguration,
          });
        }
      }
    });
    console.log(this.pageObject.stepUpdate);
    let result = await this.stepEditionService.updateStep(
      this.pageObject.stepUpdate
    );
    if (result) {
      let stepResponse: StepResponse = {
        id: this.pageObject.stepUpdate.id,
        name: this.pageObject.stepUpdate.name,
        description: this.pageObject.stepUpdate.description,
        creationDate: this.pageObject.stepToDisplay.creationDate,
        previousStepId: this.pageObject.stepUpdate.previousStepId,
        previousStepName: this.pageObject.selectedPreviousStep?.name,
      };

      for (let s of this.pageObject.processSteps) {
        if (s.id === stepResponse.id) {
          s.name = stepResponse.name;
          s.description = stepResponse.description;
          s.previousStepId = stepResponse.previousStepId;
          s.previousStepName = stepResponse.previousStepName;
          break;
        }
      }
      if (this.pageObject.selectedPreviousStep) {
        for (let s of this.pageObject.processSteps) {
          if (this.pageObject.selectedPreviousStep.id == s.id) {
            s.nextStepId = stepResponse.id;
            s.nextInventoryStepName = stepResponse.name;
            break;
          }
        }
      }
      console.log(this.pageObject.processSteps);
      this.processStepDataSharingService.updateProcessSteps(
        this.pageObject.processSteps
      );
      setTimeout(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Etape modifiée avec Success!',
        });
      }, 250);

      if (this.pageObject.creationProcessMode) {
        this.router.navigate(['processes/createProcess'], {
          state: {
            isCreationMode: true,
          },
        });
      } else {
        this.router.navigate(['processes/updateProcess'], {
          state: {
            isCreationMode: false,
          },
        });
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'an error has occured!',
      });
    }
  }

  /**
   * Submitting step data to database and sending it to a service for sharing data between process and step components
   * @param value
   */
  async createStep(value: any) {
    this.pageObject.stepQuery.name = value.nameStepInput;
    this.pageObject.stepQuery.description = value.descriptionInput;
    this.pageObject.stepQuery.creationDate = new Date().toISOString();
    this.pageObject.stepQuery.previousStepId =
      this.pageObject.selectedPreviousStep?.id;

    // might have to use a wrapper object to send the configuration for each field, for now the objects are added then sent raw
    this.stepFields.forEach((el, _) => {
      this.pageObject.stepQuery.stepFields.push({
        category: parseFloat(el.configuration.fieldConfiguration.fieldCategory),
        ...el.configuration.fieldConfiguration,
      });
    });

    let result = await this.stepEditionService.addStep(
      this.pageObject.stepQuery
    );

    if (result) {
      let stepResponse: StepResponse = {
        id: result,
        name: this.pageObject.stepQuery.name,
        description: this.pageObject.stepQuery.description,
        creationDate: this.pageObject.stepQuery.creationDate,
        previousStepId: this.pageObject.stepQuery.previousStepId,
        previousStepName: this.pageObject.selectedPreviousStep?.name,
        nextStepId: null,
        nextInventoryStepName: null,
      };

      if (this.pageObject.selectedPreviousStep) {
        for (let s of this.pageObject.processSteps) {
          if (this.pageObject.selectedPreviousStep.id == s.id) {
            s.nextStepId = stepResponse.id;
            s.nextInventoryStepName = stepResponse.name;
            break;
          }
        }
      }
      this.pageObject.processSteps.push(stepResponse);
      this.processStepDataSharingService.updateProcessSteps(
        this.pageObject.processSteps
      );
      setTimeout(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Etape ajoutée avec Success!',
        });
      }, 250);

      if (this.pageObject.creationProcessMode) {
        this.router.navigate(['processes/createProcess'], {
          state: {
            isCreationMode: true,
          },
        });
      } else {
        this.router.navigate(['processes/updateProcess'], {
          state: {
            isCreationMode: false,
          },
        });
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'an error has occured!',
      });
    }
  }

  /**
   *  converts a string to a number
   * @param value
   * @returns a number typed from entered string
   */
  toNumber(value: string): number {
    return parseFloat(value);
  }

  /**
   * shows the config interface of the field whose configuration action was clicked (cog icon)
   * @param value holds the type ( enum id) of the corresponding field
   */
  showConfigurationDialog(value: ConfigurationMatcher) {
    switch (this.toNumber(value.fieldCategory)) {
      case FieldType.dropdown:
        this.ref = this.dialogService.open(DropdownConfigurationComponent, {
          data: { value },
          header: Constants.configuration_en,
          width: '65%',
        });
        break;
      case FieldType.file_input:
        this.ref = this.dialogService.open(FileInputConfigurationComponent, {
          data: { value },
          header: Constants.configuration_en,
          width: '65%',
        });
        break;
      case FieldType.slider:
        this.ref = this.dialogService.open(SliderConfigurationComponent, {
          data: { value },
          header: Constants.configuration_en,
          width: '65%',
        });
        break;
      case FieldType.radio_buttons:
        this.ref = this.dialogService.open(
          ChoiceButtonsConfigurationComponent,
          {
            data: { value },
            header: Constants.configuration_en,
            width: '65%',
          }
        );
        break;
      case FieldType.checkboxes:
        this.ref = this.dialogService.open(
          ChoiceButtonsConfigurationComponent,
          {
            data: { value },
            header: Constants.configuration_en,
            width: '65%',
          }
        );
        break;
      case FieldType.text_input:
        this.ref = this.dialogService.open(TextInputConfigurationComponent, {
          data: { value },
          header: Constants.configuration_en,
          width: '65%',
        });
        break;
      case FieldType.date_input:
        this.ref = this.dialogService.open(DateInputConfigurationComponent, {
          data: { value },
          header: Constants.configuration_en,
          width: '65%',
        });
        break;
      case FieldType.text_output:
        this.ref = this.dialogService.open(TextOutputConfigurationComponent, {
          data: { value },
          header: Constants.configuration_en,
          width: '65%',
        });
        break;
      case FieldType.file_output:
        this.ref = this.dialogService.open(FileOutputConfigurationComponent, {
          data: { value },
          header: Constants.configuration_en,
          width: '65%',
        });
        break;
      case FieldType.link_output:
        this.ref = this.dialogService.open(LinkConfigurationComponent, {
          data: { value },
          header: Constants.configuration_en,
          width: '65%',
        });
        break;
    }
  }

  /**
   * Adds/Updates the configuration of the field in the array stepFields every time a field configuration is created or modified
   * @param $event takes a field configuration object
   */
  registerFieldConfiguration($event: FieldConfiguration) {
    if ($event.fieldPosition != null) {
      // hhhh 0 is falsy
      this.stepFields[$event.fieldPosition] = $event;
    }
    this.pageObject.currentConfiguration = $event;
  }
  /**
   * disables dropping into sidebar draggable fields
   */
  noReturnPredicate() {
    return false;
  }

  /**
   * navigates to appropriate path , depending on whether it's creation or update mode
   *  */
  navigate() {
    if (this.pageObject.creationProcessMode) {
      this.router.navigate(['processes/createProcess'], {
        state: {
          isCreationMode: true,
        },
      });
    }
    if (!this.pageObject.creationProcessMode) {
      this.router.navigate(['processes/updateProcess'], {
        state: {
          isCreationMode: false,
        },
      });
    }
  }
}
