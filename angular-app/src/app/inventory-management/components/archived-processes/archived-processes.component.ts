import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Constants } from 'src/app/common/constants';
import { StatOfBackend } from 'src/app/common/state-of-backend.enum';
import { HeaderTitleService } from 'src/app/layout/components/header/header-title.service';
import { ArchivedProcessesPage } from '../../models/process/archived-processes-page';
import { ArchivedProcessesEditionService } from './archived-processes-edition.service';

@Component({
  selector: 'app-archived-processes',
  templateUrl: './archived-processes.component.html',
  styleUrls: ['./archived-processes.component.css'],
  providers: [
    DialogService,
    DynamicDialogRef,
    ConfirmationService
  ],
})
export class ArchivedProcessesComponent implements OnInit {
  pageObject: ArchivedProcessesPage = new ArchivedProcessesPage();

  constructor(
    private archivedProcessesEdition: ArchivedProcessesEditionService,
    private headerTitleService: HeaderTitleService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  async ngOnInit() {
    this.headerTitleService.setTitle(Constants.archived_processes_en);
    this.pageObject.archivedProcesses =
      await this.archivedProcessesEdition.getArchivedProcesses();
  }

  /**
   * this function is used to open a dialog  for the deletion confirmation interface
   * @param id of process
   */
  confirmDeleteProcess(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you wanna delete this inventory process?',
      header: 'Deletion confirmation',
      icon: 'pi pi-info-circle',
      accept: async () => {
        let response = await this.archivedProcessesEdition.deleteProcess(id);
        if (response === StatOfBackend.Success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Inventory process has been deleted successfully',
          });
          this.ngOnInit();
        }
      },
    });
  }
}
