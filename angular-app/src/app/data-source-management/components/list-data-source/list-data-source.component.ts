import { Component, OnInit } from '@angular/core';
import { HeaderTitleService } from 'src/app/layout/components/header/header-title.service';
import { ListDataSourcePage } from '../../models/list-data-source-page';
import { ListDataSourceEditionService } from './list-data-source-edition.service';
import { DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { CreateDataSourceComponent } from '../create-data-source/create-data-source.component';
import { ModifyDataSourceComponent } from '../modify-data-source/modify-data-source.component';
import { Constants } from 'src/app/common/constants';
import {ConfirmationService,ConfirmEventType, MessageService } from 'primeng/api';


import { StatOfBackend } from 'src/app/common/state-of-backend.enum';


@Component({
  selector: 'app-list-data-source',
  templateUrl: './list-data-source.component.html',
  styleUrls: ['./list-data-source.component.css'],
  providers: [DialogService,DynamicDialogRef]
})
export class ListDataSourceComponent implements OnInit {

  pageObject:ListDataSourcePage = new ListDataSourcePage();

  constructor(private headerTitleService: HeaderTitleService,
              private listDataSourceEdition:ListDataSourceEditionService,
              public dialogService: DialogService,
              public ref: DynamicDialogRef,
              private confirmationService: ConfirmationService, 
              private messageService: MessageService) { }

  async ngOnInit() {
    this.headerTitleService.setTitle(Constants.dataSource_list_title_en);
    this.pageObject.dataSources=await this.listDataSourceEdition.getDataSourcesUpdated();
  }
  /**
   * this function is used to open a dialog for the creation interface
   */
  openCreateDataSource() {
    this.ref = this.dialogService.open(CreateDataSourceComponent, {
        header: Constants.dataSource_creation_title_en,
        width: '70%'
    });
  }

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }
  /**
   * this function is used to open a dialog for the modification interface
   * @param id  of data source
   */
  openEditDataSource(id:any)
  {
    this.ref=this.dialogService.open(ModifyDataSourceComponent,{
      header:Constants.dataSource_modification_title_en,
      width:'70%',
      data:{
        id: id
      },
    });
  }

  /**
   * this function is used to open a dialog  for the deletion confirmation interface
   * @param id of data source
   */
   confirmDeleteDataSource(id:any)
   {
     this.confirmationService.confirm({
       message: 'Do you really want to delete this data source?',
       header: 'Deletion confirmation',
       icon: 'pi pi-info-circle',
       accept: async () => {
         let response=await this.listDataSourceEdition.deleteDataSource(id);
         if(response === StatOfBackend.Success)
         {
           this.messageService.add({severity:'success', summary:'Success', detail:'Data source has been deleted successfully'});
           this.ngOnInit();
         }
         else
         {
           if(response === StatOfBackend.IsForeignKey)
           {
             this.messageService.add({severity:'error', summary:'Error', detail:'The data source cannot be deleted because it is used'});
           }
         }
         
       }
       
     });
   }
  

  
}
