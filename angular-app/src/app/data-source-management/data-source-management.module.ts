import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDataSourceComponent } from './components/list-data-source/list-data-source.component';
import { CreateDataSourceComponent } from './components/create-data-source/create-data-source.component';
import {ButtonModule} from 'primeng/button';
import { TableModule } from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import {PasswordModule} from 'primeng/password';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {DropdownModule} from 'primeng/dropdown';

import { ModifyDataSourceComponent } from './components/modify-data-source/modify-data-source.component';



@NgModule({
  declarations: [
    ListDataSourceComponent,
    CreateDataSourceComponent,
    ModifyDataSourceComponent
  ],
  providers:[],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    InputTextModule ,
    DynamicDialogModule,
    InputTextareaModule,
    FormsModule,
    PasswordModule,
    ToastModule,
    ConfirmDialogModule,
    DropdownModule
  ],
  exports:[
    ListDataSourceComponent,
    CreateDataSourceComponent,
    ModifyDataSourceComponent
  ]
})
export class DataSourceManagementModule { }
