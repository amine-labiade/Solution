import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CreateDataSourceEditionService } from './create-data-source-edition.service';
import Swal from 'sweetalert2';
import { ListDataSourceComponent } from '../list-data-source/list-data-source.component';
import { CreateDataSourcePage } from '../../models/create-data-source-page';

@Component({
  selector: 'app-create-data-source',
  templateUrl: './create-data-source.component.html',
  styleUrls: ['./create-data-source.component.css'],
})
export class CreateDataSourceComponent implements OnInit {
  pageObject: CreateDataSourcePage = new CreateDataSourcePage();

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private createDataSourceEdition: CreateDataSourceEditionService,
    private listDataSourceComponent: ListDataSourceComponent
  ) {}

  ngOnInit() {}

  /**
   * this function is used to retrieve data from the forms and send them to
   * the service for verification and registration in the database
   * @param value
   */
  async submitDataSource(value: any) {
    this.pageObject.dataSource.name = value.nameSourceInput;
    this.pageObject.dataSource.description = value.descriptionInput;
    this.pageObject.dataSource.connectionLink = value.linkInput;
    this.pageObject.dataSource.userAccesId = value.IdUserInput;
    this.pageObject.dataSource.password = value.passwordInput;
    this.pageObject.dataSource.acessToken = value.TokenInput;
    this.pageObject.dataSource.type =
      this.createDataSourceEdition.setDataSourceType(value.typeInput);
    let result = await this.createDataSourceEdition.saveDataSource(
      this.pageObject.dataSource
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
