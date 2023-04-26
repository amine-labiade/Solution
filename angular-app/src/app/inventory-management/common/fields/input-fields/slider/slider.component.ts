import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { FieldType } from 'src/app/common/field-type';
import { SliderConfigurationPage } from 'src/app/inventory-management/models/fields/slider/slider-configuration-page';
import { ConfigurationMatcher } from '../../../models/configuration-matcher';
import { FieldConfiguration } from '../../../models/field-configuration';
import { FieldConfigurationSharingService } from '../../../services/field-configuration-sharing.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {


  constructor(private fieldConfigurationSharingService:FieldConfigurationSharingService) { }
  
  @Input() droppedFieldId! : number;
  @Input() droppedFieldType!: string;
  @Output() trashed = new EventEmitter<string>();
  @Output() config = new EventEmitter<ConfigurationMatcher>();
  @Output() configurationEmitter = new EventEmitter<any>();

  fieldConfig! : FieldConfiguration;
  subscription! : Subscription;
  sliderValue! : number;
  pageObject :  FieldConfiguration = {configuration : null, fieldCategory : FieldType.slider}
  ngOnInit(): void {
    this.subscription = this.fieldConfigurationSharingService.currentConfiguration.subscribe( configuration => { this.fieldConfig = configuration;
                                                                                                  if(this.fieldConfig.fieldPosition != null){
                                                                                                    if (this.fieldConfig.fieldPosition === this.droppedFieldId && this.fieldConfig.fieldCategory === parseFloat(this.droppedFieldType) && this.fieldConfig.fieldCategory === parseFloat(this.droppedFieldType)){
                                                                                                      this.pageObject = {...this.fieldConfig};
                                                                                                      this.emitFieldConfiguration() 
                                                                                                    }
                                                                                                  }                                     
                                                                                                } 
                                                                                            )
                                                                                            
    this.sliderValue = this.pageObject.configuration ? (this.pageObject.configuration.fieldConfiguration?.sliderMax - this.pageObject.configuration?.fieldConfiguration?.sliderMin)/2 : 0
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
