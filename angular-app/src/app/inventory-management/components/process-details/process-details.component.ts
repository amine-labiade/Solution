import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/common/constants';
import { HeaderTitleService } from 'src/app/layout/components/header/header-title.service';
import { ProcessStepDataSharingService } from '../../common/services/process-step-data-sharing.service';
import { ProcessDetailsPage } from '../../models/process/process-details-page';
import { ProcessDetailsEditionService } from './process-details-edition.service';

@Component({
  selector: 'app-process-details',
  templateUrl: './process-details.component.html',
  styleUrls: ['./process-details.component.css'],
})
export class ProcessDetailsComponent implements OnInit {
  pageObject: ProcessDetailsPage = new ProcessDetailsPage();
  subsciption!: Subscription;
  published: string = 'Published';
  unpublished: string = 'Unpublished';
  scheduled: string = 'Scheduled';

  constructor(
    private router: Router,
    private headerTitleService: HeaderTitleService,
    private processDetailEdition: ProcessDetailsEditionService,
    private processServiceSharing: ProcessStepDataSharingService
  ) {
    this.pageObject.idProcess =
      router.getCurrentNavigation()?.extras?.state?.['data'];
  }
  async ngOnInit() {
    if (!this.pageObject.idProcess) {
      this.subsciption =
        this.processServiceSharing.currentProcessDetails.subscribe(
          (processPage) => {
            if (processPage) {
              this.pageObject.process = processPage;
            }
          }
        );
    }
    this.headerTitleService.setTitle(Constants.process_details_title_en);
    this.pageObject.process =
      await this.processDetailEdition.getProcessDetailById(
        this.pageObject.idProcess
      );
    this.pageObject.process.creationDate = new Date(
      this.pageObject.process.creationDate
    );
    if (this.pageObject.process.unpublishingDate) {
      this.pageObject.process.unpublishingDate = new Date(
        this.pageObject.process.unpublishingDate
      );
    }
    if (this.pageObject.process.publishingDate) {
      this.pageObject.process.publishingDate = new Date(
        this.pageObject.process.publishingDate
      );
    }
  }

  /**
   * display interface for step details
   * @param id of step
   */
  stepDetails(id: any) {
    this.processServiceSharing.updateLocalProcessDetails(
      this.pageObject.process
    );
    this.router.navigate(['processes/processDetails/stepDetails'], {
      state: {
        data: id,
      },
    });
  }
}
