import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderTitleService } from 'src/app/layout/components/header/header-title.service';

import { CreationProcessEditionService } from './creation-process-edition.service';
import { Constants } from 'src/app/common/constants';
import Swal from 'sweetalert2';
import { StateOfValidationForm } from 'src/app/common/state-of-validation-form.enum';
import { Message, ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StatOfBackend } from 'src/app/common/state-of-backend.enum';
import { ProcessQuery } from '../../models/process/process-query';
import { ProcessPage } from '../../models/process/process-page';
import { ProcessStepDataSharingService } from '../../common/services/process-step-data-sharing.service';
import { Subscription } from 'rxjs';
import { StepResponse } from '../../models/step/step-response';
import { ProcessToDisplay } from '../../models/process/process-to-display';

@Component({
  selector: 'app-creation-process',
  templateUrl: './creation-process.component.html',
  styleUrls: ['./creation-process.component.css'],
  providers: [DialogService, DynamicDialogRef, ConfirmationService],
})
export class CreationProcessComponent implements OnInit {
  pageObject: ProcessPage = new ProcessPage();
  processQuery: ProcessQuery = new ProcessQuery();

  endDateIsNull = StateOfValidationForm.endDateIsNull;
  startDateIsNull = StateOfValidationForm.startDateIsNull;
  startDateGreaterEndDate = StateOfValidationForm.startDateGreaterEndDate;

  subsciption!: Subscription; //subscription to processStepDataSharingService to share data back and forth with step interfaces

  no_next_step_available_en = Constants.no_next_step_available_en;

  constructor(
    private headerTitleService: HeaderTitleService,
    private creationProcessEditionService: CreationProcessEditionService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private processStepDataSharingService: ProcessStepDataSharingService
  ) {
    this.pageObject.isCreationProcess =
      router.getCurrentNavigation()?.extras?.state?.['isCreationMode'];
    this.pageObject.idProcessToGet =
      router.getCurrentNavigation()?.extras?.state?.['data'];
  }

  async ngOnInit() {
    if (this.pageObject.idProcessToGet === undefined) {
      this.subsciption =
        this.processStepDataSharingService.currentProcess.subscribe(
          async (processPage) => {
            if (processPage) {
              this.pageObject.processToDisplay = processPage;
              this.pageObject.steps = this.pageObject.processToDisplay?.steps;
              if (this.pageObject.processToDisplay.dataSourceId) {
                this.pageObject.usersFromApi =
                  await this.creationProcessEditionService.getUsers(
                    this.pageObject.processToDisplay.dataSourceId
                  );
                this.pageObject.users = this.pageObject.usersFromApi;
                this.pageObject.defaultsUsers =
                  this.creationProcessEditionService.setDefaultUsers(
                    this.pageObject.processToDisplay.users,
                    this.pageObject.usersFromApi
                  );
              }
              this.processStepDataSharingService.currentProcessSteps.subscribe(
                (steps) => {
                  this.pageObject.steps = steps;
                }
              );
              if (!this.pageObject.isCreationProcess) {
                this.headerTitleService.setTitle(
                  Constants.process_modification_title_en
                );
                this.pageObject.idProcessToGet =
                  this.pageObject.processToDisplay.id;
              }
            }
          }
        );
    } else {
      this.headerTitleService.setTitle(Constants.process_modification_title_en);
      this.pageObject.processToDisplay =
        await this.creationProcessEditionService.getProcessById(
          this.pageObject.idProcessToGet
        );
      if (this.pageObject.processToDisplay.publishingDate) {
        this.pageObject.processToDisplay.publishingDate = new Date(
          this.pageObject.processToDisplay.publishingDate
        );
      }
      if (this.pageObject.processToDisplay.unpublishingDate) {
        this.pageObject.processToDisplay.unpublishingDate = new Date(
          this.pageObject.processToDisplay.unpublishingDate
        );
      }
      this.pageObject.steps = this.pageObject.processToDisplay?.steps;
      if (this.pageObject.processToDisplay.dataSourceId) {
        this.pageObject.usersFromApi =
          await this.creationProcessEditionService.getUsers(
            this.pageObject.processToDisplay.dataSourceId
          );
        this.pageObject.users = this.pageObject.usersFromApi;
        this.pageObject.defaultsUsers =
          this.creationProcessEditionService.setDefaultUsers(
            this.pageObject.processToDisplay.users,
            this.pageObject.usersFromApi
          );
      }
    }
    //process creation
    if (this.pageObject.isCreationProcess) {
      this.headerTitleService.setTitle(Constants.process_creation_title_en);

      // retrieving local array of all the created steped channeled through the 'ProcessStepDataSharingService'
      this.subsciption =
        this.processStepDataSharingService.currentProcessSteps.subscribe(
          (pSteps) => {
            if (pSteps.length > 0) {
              this.pageObject.steps = pSteps;
            }
          }
        );
    }
    this.pageObject.inventoryTypes =
      await this.creationProcessEditionService.getInventoryTypes();
    this.pageObject.dataSources =
      await this.creationProcessEditionService.getDataSources();
  }

  /**
   * this function is called when the source is changed then
   * the list of users must be changed and also the default users
   * @param event
   */
  async onChange(event: any) {
    this.pageObject.usersFromApi =
      await this.creationProcessEditionService.getUsers(event.value);
    this.pageObject.users = this.pageObject.usersFromApi;
    this.pageObject.defaultsUsers = [];
  }
  /**
   * this function is called when dropdown of data source is clear
   * @param event
   */
  onClear(event: any) {
    this.pageObject.users = [];
    this.pageObject.defaultsUsers = [];
  }
  /**
   * this function is used to call the appropriate functions
   * @param value
   */
  async SubmitDataProcess(value: any) {
    //process modification
    if (!this.pageObject.isCreationProcess) {
      this.handlingUpdate(value);
    } else {
      this.processQuery.name = value.nameProcessInput;
      this.processQuery.description = value.descriptionInput;
      this.processQuery.type = value.typeProcessInput;
      this.processQuery.usersDataSourceId = value.userSourceInput;
      this.processQuery.publishingDate = value.startDateInput;
      this.processQuery.unpublishingDate = value.endDateInput;
      this.processQuery.processStepsIds = this.pageObject.steps.map(
        ({ id }) => ({ stepId: id })
      );
      this.processQuery.processUsers =
        this.creationProcessEditionService.setSelectedUsers(
          this.pageObject.usersFromApi,
          value.usersInput
        );

      let response = await this.creationProcessEditionService.createProcess(
        this.processQuery
      );
      if (response) {
        // this is a workaround to show toast notification after navigation
        setTimeout(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Invenotry process has been successfully added.',
          });
        }, 100);

        this.router.navigateByUrl('/processes');
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'an error has occured',
        });
      }
    }
  }
  /**
   * this function is used to retrieve form data in case of modification
   * and send them to the service for verification and registration in the database
   * @param value
   */
  async handlingUpdate(value: any) {
    this.pageObject.processUpdate.id = this.pageObject.idProcessToGet;
    this.pageObject.processUpdate.name = value.nameProcessInput;
    this.pageObject.processUpdate.description = value.descriptionInput;
    this.pageObject.processUpdate.typeId = value.typeProcessInput;
    this.pageObject.processUpdate.publishingDate = value.startDateInput;
    this.pageObject.processUpdate.unpublishingDate = value.endDateInput;
    this.pageObject.processUpdate.usersDataSourceId = value.userSourceInput;
    this.pageObject.processUpdate.users =
      this.creationProcessEditionService.setSelectedUsers(
        this.pageObject.usersFromApi,
        value.usersInput
      );
    this.pageObject.processUpdate.steps =
      this.creationProcessEditionService.getListStepsIds(this.pageObject.steps);
    if (
      !this.creationProcessEditionService.valideForm(
        this.pageObject.processUpdate
      )
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields highlighted in red have to be filled',
        confirmButtonText: 'Close',
        confirmButtonColor: '#1F7ACE',
      });
    }
    this.pageObject.stateValidationDate =
      this.creationProcessEditionService.validateDates(
        this.pageObject.processUpdate
      );

    if (this.pageObject.stateValidationDate == StateOfValidationForm.valid) {
      await this.creationProcessEditionService.updateProcess(
        this.pageObject.processUpdate
      );
      setTimeout(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Inventory process has been updated successfully',
        });
      }, 100);
      this.router.navigateByUrl('/processes');
    }
  }

  /**
   * function that handles navigation when going to the creation/modification step interface
   */
  navigateAndStoreProcessLocally() {
    if (this.pageObject.defaultsUsers.length > 0) {
      this.pageObject.processToDisplay.users = this.pageObject.defaultsUsers;
    }
    this.pageObject.processToDisplay.steps = this.pageObject.steps;
    this.processStepDataSharingService.updateLocalProcess(
      this.pageObject.processToDisplay
    );
    this.processStepDataSharingService.updateProcessSteps(
      this.pageObject.processToDisplay.steps
    );
    if (this.pageObject.isCreationProcess) {
      this.router.navigate(['/processes/createProcess/createStep'], {
        state: {
          isCreationMode: true,
          isCreationPocess: true,
        },
      });
    }

    if (!this.pageObject.isCreationProcess) {
      this.router.navigate(['processes/updateProcess/createStep'], {
        state: {
          isCreationMode: true,
          isCreationPocess: false,
        },
      });
    }
  }

  /**
   * method to handle navigating back to list of processes when clicking the cancel button
   * It also clears out the process creation form
   */
  cancelToProcesses() {
    this.processStepDataSharingService.updateLocalProcess(
      new ProcessToDisplay()
    );
    this.processStepDataSharingService.updateProcessSteps([]);
    this.router.navigate(['/processes']);
  }

  /**
   * this function is used to open a dialog  for the deletion confirmation interface
   * @param id of step
   */
  confirmDeleteStep(id: any) {
    this.confirmationService.confirm({
      message: 'Do you really want to delete this step?',
      header: 'Deletion confirmation',
      icon: 'pi pi-info-circle',
      accept: async () => {
        let response = await this.creationProcessEditionService.deleteStep(id);
        if (response === StatOfBackend.Success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: "Step has been successfully deleted",
          });
          this.ngOnInit();
        }
      },
    });
  }

  goToUpdateStep(id: string) {
    if (this.pageObject.defaultsUsers.length > 0) {
      this.pageObject.processToDisplay.users = this.pageObject.defaultsUsers;
    }
    this.pageObject.processToDisplay.steps = this.pageObject.steps;
    this.processStepDataSharingService.updateLocalProcess(
      this.pageObject.processToDisplay
    );
    this.processStepDataSharingService.updateProcessSteps(
      this.pageObject.processToDisplay.steps
    );
    if (this.pageObject.isCreationProcess) {
      this.router.navigate(['processes/createProcess/updateStep'], {
        state: {
          step: id,
          process: this.pageObject.idProcessToGet,
          isCreationMode: false,
          isCreationPocess: true,
        },
      });
    } else {
      this.router.navigate(['processes/updateProcess/updateStep'], {
        state: {
          step: id,
          process: this.pageObject.idProcessToGet,
          isCreationMode: false,
          isCreationPocess: false,
        },
      });
    }
  }
}
