import { Injectable } from '@angular/core';
import { StateOfValidationForm } from 'src/app/common/state-of-validation-form.enum';
import { SliderQuery } from 'src/app/inventory-management/models/fields/slider/slider-query';

@Injectable({
  providedIn: 'root',
})
export class SliderConfigurationEditionService {
  constructor() {}

  /**
   * check if the form data is valid
   * @param slider
   * @returns stat enum
   */
  validForm(slider: SliderQuery) {
    if (!slider.label || !slider.name || !slider.sliderMax || !slider.sliderMin) {
      return StateOfValidationForm.empty;
    }
    if (slider.sliderMin) {
      if (slider.sliderMin >= slider.sliderMax) {
        return StateOfValidationForm.minMaxNotValid;
      }
    }
    return StateOfValidationForm.valid;
  }
}
