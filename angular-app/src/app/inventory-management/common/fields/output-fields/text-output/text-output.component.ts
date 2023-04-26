import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { FieldType } from 'src/app/common/field-type';
import { TextOutputConfigurationPage } from 'src/app/inventory-management/models/fields/text-output/text-output-configuration-page';
import { ConfigurationMatcher } from '../../../models/configuration-matcher';
import { FieldConfiguration } from '../../../models/field-configuration';
import { FieldConfigurationSharingService } from '../../../services/field-configuration-sharing.service';

@Component({
  selector: 'app-text-output',
  templateUrl: './text-output.component.html',
  styleUrls: ['./text-output.component.css'],
})
export class TextOutputComponent implements OnInit {
  

  constructor(private fieldConfigurationSharingService:FieldConfigurationSharingService) { }
  @Input() droppedFieldId! : number;
  @Input() droppedFieldType!: string;
  @Output() trashed = new EventEmitter<string>();
  @Output() config = new EventEmitter<ConfigurationMatcher>();
  @Output() configurationEmitter = new EventEmitter<any>();

  fieldConfig! : FieldConfiguration;
  subscription! : Subscription;
  pageObject :  FieldConfiguration = {configuration : null, fieldCategory : FieldType.text_output}
  ngOnInit(): void {
    this.subscription = this.fieldConfigurationSharingService.currentConfiguration.subscribe( configuration => { this.fieldConfig = configuration;
                                                                                                  if(this.fieldConfig.fieldPosition != null){
                                                                                                    if (this.fieldConfig.fieldPosition === this.droppedFieldId && this.fieldConfig.fieldCategory === parseFloat(this.droppedFieldType)){
                                                                                                      this.pageObject = {...this.fieldConfig};
                                                                                                      this.emitFieldConfiguration() 
                                                                                                    }
                                                                                                  }                                     
                                                                                                } 
                                                                                            )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  /**
   * Emits click event to remove the field whose trash button was clicked from the list of dropped fields
   */
  emitDeletion(): void {
    this.trashed.next(this.droppedFieldId.toString());
  }

  /**
   * Emits click event to pop up the configuration dialog for each dropped field
   */
  emitConfig(): void {
    this.config.next({ fieldPosition : this.droppedFieldId , fieldCategory : this.droppedFieldType, fieldConfiguration : this.pageObject.configuration});;
  }

  /**
   * Emits the configuration of the field to the parent component (StepComponent)
   */
   emitFieldConfiguration() : void {
    this.configurationEmitter.next(this.pageObject)
  }
}
