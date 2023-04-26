import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppShellComponent } from './shell/shell.component';
import { AuthentificationComponent } from './authentication/components/authentication/authentification.component';
import { CreationProcessComponent } from './inventory-management/components/creation-process/creation-process.component';
import { ListProcessComponent } from './inventory-management/components/list-process/list-process.component';
import { StepCreationComponent } from './inventory-management/components/step-creation/step-creation.component';
import { ListDataSourceComponent } from './data-source-management/components/list-data-source/list-data-source.component';
import { ArchivedProcessesComponent } from './inventory-management/components/archived-processes/archived-processes.component';
import { ProcessDetailsComponent } from './inventory-management/components/process-details/process-details.component';
import { StepDetailsComponent } from './inventory-management/components/step-details/step-details.component';

const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      {
        path: '',
        redirectTo: '/processes',
        pathMatch: 'full',
      },
      {
        path: 'processes',
        component: ListProcessComponent,
      },
      {
        path: 'processes/createProcess',
        component: CreationProcessComponent,
      },
      {
        path: 'processes/updateProcess',
        component: CreationProcessComponent,
      },
      {
        path: 'processes/processDetails',
        component: ProcessDetailsComponent,
      },
      {
        path: 'processes/processDetails/stepDetails',
        component: StepDetailsComponent,
      },
      {
        path: 'processes/createProcess/createStep',
        component: StepCreationComponent,
      },
      {
        path: 'processes/createProcess/updateStep',
        component: StepCreationComponent,
      },
      {
        path: 'processes/updateProcess/updateStep',
        component: StepCreationComponent,
      },
      {
        path: 'processes/updateProcess/createStep',
        component: StepCreationComponent,
      },
      {
        path: 'dataSources',
        component: ListDataSourceComponent,
      },
      {
        path: 'archives',
        component: ArchivedProcessesComponent,
      },
    ],
  },
  {
    path: 'auth',
    component: AuthentificationComponent,
  },
  {
    path: '**',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
