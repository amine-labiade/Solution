import { Constants } from 'src/app/common/constants';
import { ChoiceButtonsType, FieldType } from 'src/app/common/field-type';

export class FieldDetailsPage {
  field: any;
  idField!: string;
  category!: string;
  nullSource: boolean = true;
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

  dropdown = FieldType.dropdown;
  slider = FieldType.slider;
  radioButton = FieldType.radio_buttons;
  checkBoxes = FieldType.checkboxes;
  fileInput = FieldType.file_input;
  fileOutPut = FieldType.file_output;
  dateInput = FieldType.date_input;
  link = FieldType.link_output;
  textInput = FieldType.text_input;
  textOutput = FieldType.text_output;
}
