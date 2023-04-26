import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { InventoryManagementModule } from './inventory-management/inventory-management.module';
import { AuthentificationModule } from './authentication/authentification.module';
import { LayoutModule } from './layout/layout.module';
import { DataSourceManagementModule } from './data-source-management/data-source-management.module';
import { AppShellComponent } from './shell/shell.component';

@NgModule({
  declarations: [
    AppComponent,
    AppShellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthentificationModule,
    LayoutModule,
    InventoryManagementModule,
    HttpClientModule,
    DataSourceManagementModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
