import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ToolbarModule } from 'primeng/toolbar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { TreeModule } from 'primeng/tree';
import { CardModule } from 'primeng/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreationProcessComponent } from './components/creation-process/creation-process.component';
import { ListProcessComponent } from './components/list-process/list-process.component';
import { StepCreationComponent } from './components/step-creation/step-creation.component';
import { TextInputConfigurationComponent } from './common/fields-config/text-input-configuration/text-input-configuration.component';
import { FileInputConfigurationComponent } from './common/fields-config/file-input-configuration/file-input-configuration.component';
import { TextOutputConfigurationComponent } from './common/fields-config/text-output-configuration/text-output-configuration.component';
import { SliderConfigurationComponent } from './common/fields-config/slider-configuration/slider-configuration.component';
import { LinkConfigurationComponent } from './common/fields-config/link-configuration/link-configuration.component';
import { FileOutputConfigurationComponent } from './common/fields-config/file-output-configuration/file-output-configuration.component';
import { DropdownConfigurationComponent } from './common/fields-config/dropdown-configuration/dropdown-configuration.component';
import { ChoiceButtonsConfigurationComponent } from './common/fields-config/choice-buttons-configuration/choice-buttons-configuration.component';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DropdownComponent } from './common/fields/input-fields/dropdown/dropdown.component';
import { FileInputComponent } from './common/fields/input-fields/file-input/file-input.component';
import { LinkOutputComponent } from './common/fields/output-fields/link-output/link-output.component';
import { FileOutputComponent } from './common/fields/output-fields/file-output/file-output.component';
import { TextOutputComponent } from './common/fields/output-fields/text-output/text-output.component';
import { TextInputComponent } from './common/fields/input-fields/text-input/text-input.component';
import { CheckboxesComponent } from './common/fields/input-fields/checkboxes/checkboxes.component';
import { RadioButtonsComponent } from './common/fields/input-fields/radio-buttons/radio-buttons.component';
import { SliderComponent } from './common/fields/input-fields/slider/slider.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { AvatarModule } from 'primeng/avatar';
import { DialogService } from 'primeng/dynamicdialog';
import { ArchivedProcessesComponent } from './components/archived-processes/archived-processes.component';
import { SliderModule } from 'primeng/slider';
import { ProcessDetailsComponent } from './components/process-details/process-details.component';
import { StepDetailsComponent } from './components/step-details/step-details.component';
import { FieldDetailsComponent } from './components/field-details/field-details.component';
import { DateInputComponent } from './common/fields/input-fields/date-input/date-input.component';
import { DateInputConfigurationComponent } from './common/fields-config/date-input-configuration/date-input-configuration.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PasswordModule } from 'primeng/password';


@NgModule({
  declarations: [
    CreationProcessComponent,
    ListProcessComponent,
    StepCreationComponent,
    TextInputConfigurationComponent,
    FileInputConfigurationComponent,
    TextOutputConfigurationComponent,
    SliderConfigurationComponent,
    LinkConfigurationComponent,
    FileOutputConfigurationComponent,
    DropdownConfigurationComponent,
    ChoiceButtonsConfigurationComponent,
    DropdownComponent,
    FileInputComponent,
    LinkOutputComponent,
    FileOutputComponent,
    TextOutputComponent,
    TextInputComponent,
    CheckboxesComponent,
    RadioButtonsComponent,
    SliderComponent,
    ArchivedProcessesComponent,
    ProcessDetailsComponent,
    StepDetailsComponent,
    FieldDetailsComponent,
    DateInputComponent,
    DateInputConfigurationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    MultiSelectModule,
    CalendarModule,
    TableModule,
    FormsModule,
    MessageModule,
    ToolbarModule,
    CheckboxModule,
    InputNumberModule,
    TreeModule,
    RadioButtonModule,
    ReactiveFormsModule,
    TreeModule,
    DragDropModule,
    CardModule,
    FontAwesomeModule,
    ConfirmDialogModule,
    DialogModule,
    ToastModule,
    AvatarModule,
    SliderModule,
    PasswordModule
  ],
  exports: [
    CreationProcessComponent,
    ListProcessComponent,
    StepCreationComponent,
    TextInputConfigurationComponent,
    FileInputConfigurationComponent,
    TextOutputConfigurationComponent,
    SliderConfigurationComponent,
    LinkConfigurationComponent,
    FileOutputConfigurationComponent,
    DropdownConfigurationComponent,
    ChoiceButtonsConfigurationComponent,
    ArchivedProcessesComponent,
    ProcessDetailsComponent,
    StepDetailsComponent,
    FieldDetailsComponent,
  ],
  providers: [ConfirmationService, DialogService, MessageService],
})
export class InventoryManagementModule {}
