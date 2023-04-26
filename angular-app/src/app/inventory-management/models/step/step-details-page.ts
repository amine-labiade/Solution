import { Constants } from 'src/app/common/constants';
import { StepResponseMoreDetails } from './step-response-more-details';

export class StepDetailsPage {
  idStepToGet!: string;
  FieldsType = Constants.listCategoryField;
  step: StepResponseMoreDetails = new StepResponseMoreDetails();
  dropDownTitle = Constants.dropdown_titile_en;
  sliderTitle = Constants.slider_title_en;
  radioButtonTitle = Constants.radio_title_en;
  checkBoxesTitle = Constants.checkboxes_title_en;
  fileInputTitle = Constants.file_input_title_en;
  fileOutputTitle = Constants.file_output_title_en;
  textInputTitle = Constants.text_input_title_en;
  textOutputTitle = Constants.text_output_title_en;
  linkTitle = Constants.link_title_en;
  dateInputTitle = Constants.date_input_title_en;
}
