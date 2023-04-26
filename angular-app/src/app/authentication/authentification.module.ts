import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthentificationComponent } from './components/authentication/authentification.component';
import { RouterModule } from '@angular/router';
import {ProgressSpinnerModule} from 'primeng/progressspinner';


@NgModule({
  declarations: [AuthentificationComponent],
  imports: [
    CommonModule,
    RouterModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    BrowserAnimationsModule,
    ProgressSpinnerModule
  ],
  exports:[AuthentificationComponent]

})
export class AuthentificationModule { }
