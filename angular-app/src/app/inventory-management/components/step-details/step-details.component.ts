import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Constants } from 'src/app/common/constants';
import { HeaderTitleService } from 'src/app/layout/components/header/header-title.service';
import { StepDetailsPage } from '../../models/step/step-details-page';
import { FieldDetailsComponent } from '../field-details/field-details.component';
import { StepDetailsEditionService } from './step-details-edition.service';

@Component({
  selector: 'app-step-details',
  templateUrl: './step-details.component.html',
  styleUrls: ['./step-details.component.css'],
  providers: [DialogService, DynamicDialogRef],
})
export class StepDetailsComponent implements OnInit {
  pageObject: StepDetailsPage = new StepDetailsPage();
  dropDown = 'DropdownInput';
  slider = 'SliderInput';
  radioButton = 'RadioButtons';
  checkBoxes = 'Checkboxes';
  fileInput = 'FileInput';
  fileOutput = 'FileOutput';
  textInput = 'TextInput';
  textOutput = 'TextOutput';
  link = 'LinkOutput';
  dateInput = 'DateInput';

  constructor(
    private router: Router,
    private headerTitleService: HeaderTitleService,
    private stepDetailEdition: StepDetailsEditionService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef
  ) {
    this.pageObject.idStepToGet =
      router.getCurrentNavigation()?.extras?.state?.['data'];
  }

  async ngOnInit() {
    this.headerTitleService.setTitle(Constants.step_details_title_en);
    this.pageObject.step = await this.stepDetailEdition.getStepDetailById(
      this.pageObject.idStepToGet
    );
    this.pageObject.step.creationDate = new Date(
      this.pageObject.step.creationDate
    );
  }

  /**
   * display field details
   * @param field
   */
  openDetailsField(field: any) {
    this.ref = this.dialogService.open(FieldDetailsComponent, {
      header: Constants.field_details_title_en,
      width: '70%',
      data: {
        field: field,
      },
    });
  }
}
