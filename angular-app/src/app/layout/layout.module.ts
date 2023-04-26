import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonModule } from 'primeng/button';
import { HeaderTitleService } from './components/header/header-title.service';


@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
  ],
  exports : [
    SidebarComponent,
    HeaderComponent
  ],
  providers : [
    HeaderTitleService
  ]
})
export class LayoutModule { }
