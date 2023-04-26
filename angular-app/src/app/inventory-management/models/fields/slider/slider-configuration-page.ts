import { SliderQuery } from './slider-query';
import { SliderResponse } from './slider-response';
import { SliderUpdate } from './slider-update';

export class SliderConfigurationPage {
  fieldConfiguration: SliderQuery = new SliderQuery();
  fieldResponse: SliderResponse = new SliderResponse();
  fieldUpdated: SliderUpdate = new SliderUpdate();
}
