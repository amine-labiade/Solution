import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ChoiceButtonsType, FieldType } from 'src/app/common/field-type';
import { FieldDetailsPage } from '../../models/fields/field-details-page';
import { FieldDetailsEditionService } from './field-details-edition.service';

@Component({
  selector: 'app-field-details',
  templateUrl: './field-details.component.html',
  styleUrls: ['./field-details.component.css'],
})
export class FieldDetailsComponent implements OnInit {
  pageObject: FieldDetailsPage = new FieldDetailsPage();

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private fieldDetailsService: FieldDetailsEditionService
  ) {}

  async ngOnInit() {
    this.pageObject.idField = this.config.data.field.id;
    this.pageObject.category = this.config.data.field.category;
    this.pageObject.field = await this.fieldDetailsService.getFieldDetailsById(
      this.pageObject.idField,
      this.pageObject.category
    );
    if (this.pageObject.field.dataSource) {
      this.pageObject.nullSource = false;
    }
    if (this.pageObject.field.category === this.pageObject.dateInput) {
      if (this.pageObject.field.minDate) {
        this.pageObject.field.minDate = new Date(this.pageObject.field.minDate);
      }
      if (this.pageObject.field.maxDate) {
        this.pageObject.field.maxDate = new Date(this.pageObject.field.maxDate);
      }
    }
  }
}
