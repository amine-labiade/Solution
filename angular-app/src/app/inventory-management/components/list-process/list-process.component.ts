import { Component, OnInit } from '@angular/core';
import { HeaderTitleService } from 'src/app/layout/components/header/header-title.service';

import { ListProcessService } from './list-process.service';
import { Constants } from 'src/app/common/constants';

import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ProcessResponse } from '../../models/process/process-response';
import { ListProcessPage } from '../../models/process/list-process-page';
import { ProcessState } from 'src/app/common/process-state.enum';

@Component({
  selector: 'app-list-process',
  templateUrl: './list-process.component.html',
  styleUrls: ['./list-process.component.css'],
  providers: [],
})
export class ListProcessComponent implements OnInit {
  states!: any[]; // warn
  processes: ProcessResponse[] = new Array<ProcessResponse>();
  pageObject: ListProcessPage = new ListProcessPage();
  published: string = 'Published';
  unpublished: string = 'Unpublished';
  scheduled: string = 'Scheduled';

  constructor(
    private headerTitleService: HeaderTitleService,
    private listProcessService: ListProcessService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.headerTitleService.setTitle(Constants.process_list_title_en);
    this.listProcessService
      .getAllProcesses()
      .then((processes: ProcessResponse[]) => {
        this.processes = processes;
      });

    // Should be enums
    this.states = [
      { label: 'Published', value: 'Published' },
      { label: 'Disabled', value: 'Unpublished' },
      { label: 'Scheduled', value: 'Scheduled' },
    ];
  }

  updateProcess(id: any) {
    this.router.navigate(['processes/updateProcess'], {
      state: {
        data: id,
        isCreationMode: false,
      },
    });
  }

  processDetails(id: any) {
    this.router.navigate(['processes/processDetails'], {
      state: {
        data: id,
      },
    });
  }
  goToCreationProcess() {
    this.router.navigate(['processes/createProcess'], {
      state: {
        isCreationMode: true,
      },
    });
  }

  confirmProcessArchiving(id: string) {
    this.confirmationService.confirm({
      message: Constants.process_archiving_confirmation_message_en,
      header: "Archival confirmation",
      icon: 'pi pi-info-circle',
      accept: async () => {
        let response = await this.listProcessService.archiveProcess(id);
        if (response) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Inventory process has been successfully archived',
          });
          this.ngOnInit();
        } else {
          if (!response) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'une Error est arrivée',
            });
          }
        }
      },
    });
  }
  async favoriteUnfavoriteProcess(id: string) {
    let response = await this.listProcessService.favoriteUnfavoriteProcess(id);
    if (response) {
      if (this.processes.find((p) => p.id === id)?.isFavorite) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: "Inventory process is no longer a favorite",
        });
        this.ngOnInit();
      } else {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Inventory process is added to favorites',
        });
        this.ngOnInit();
      }
    }
  }

  show(value: any) {
    let val = value.toDateString();
  }
}
