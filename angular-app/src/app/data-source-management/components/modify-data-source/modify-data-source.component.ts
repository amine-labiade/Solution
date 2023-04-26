import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { ModifyDataSourcePage } from '../../models/modify-data-source-page';
import { CreateDataSourceEditionService } from '../create-data-source/create-data-source-edition.service';
import { ListDataSourceComponent } from '../list-data-source/list-data-source.component';
import { ModifyDataSourceEditionService } from './modify-data-source-edition.service';

@Component({
  selector: 'app-modify-data-source',
  templateUrl: './modify-data-source.component.html',
  styleUrls: ['./modify-data-source.component.css'],
})
export class ModifyDataSourceComponent implements OnInit {
  pageObject: ModifyDataSourcePage = new ModifyDataSourcePage();

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private dataSourceEdition: ModifyDataSourceEditionService,
    private listDataSourceComponent: ListDataSourceComponent,
    private createDataSourceEdition: CreateDataSourceEditionService
  ) {}

  async ngOnInit() {
    this.pageObject.dataSource = await this.dataSourceEdition.getOneDataSource(
      this.config.data.id
    );
    this.pageObject.selectedValueType =
      this.dataSourceEdition.enumTostringDataSourceType(
        this.pageObject.dataSource.type
      );
  }

  /**
   * this function is used to retrieve data from the forms and send them to the
   * service for verification and modification in the database
   * @param value
   */
  async submitDataSourceUpdated(value: any) {
    this.pageObject.dataSourceUpdated.id = this.config.data.id;
    this.pageObject.dataSourceUpdated.name = value.nameSourceInput;
    this.pageObject.dataSourceUpdated.description = value.descriptionInput;
    this.pageObject.dataSourceUpdated.connectionLink = value.linkInput;
    this.pageObject.dataSourceUpdated.type =
      this.createDataSourceEdition.setDataSourceType(value.typeInput);
    this.pageObject.dataSourceUpdated.userAccesId = value.IdUserInput;
    this.pageObject.dataSourceUpdated.password = value.passwordInput;
    this.pageObject.dataSourceUpdated.acessToken = value.TokenInput;
    let result = await this.dataSourceEdition.UpdateDataSource(
      this.pageObject.dataSourceUpdated
    );
    if (result == false) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields highlighted in red have to be filled',
        confirmButtonText: 'Close',
        confirmButtonColor: '#1F7ACE',
      });
    } else {
      this.ref.close();
      this.listDataSourceComponent.ngOnInit();
    }
  }
}
