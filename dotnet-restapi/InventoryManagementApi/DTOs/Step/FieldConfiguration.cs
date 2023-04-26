using InventoryManagementApi.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using static InventoryManagementApi.Models.FieldDataModel;

namespace InventoryManagementApi.DTOs.Step
{
    public class FieldConfiguration
    {

        // Properties specific to all fields
        public string Label { get; set; }
        public int Position { get; set; }
        public FieldCategory Category { get; set; }
        public Guid? DataSourceId { get; set; }


        // Properties specific to all input fields
        public string Name { get; set; }
        public bool IsRequired { get; set; }


        // Properties specific to FileInput
        public string FileInputType { get; set; }
        public string FileInputExtension { get; set; }
        public int MinSize { get; set; }
        public int MaxSize { get; set; }

        // Properties specific to DropDown
        public bool IsMultiselect { get; set; }

        // Properties specific to ChoiceButtons
        public ChoiceButtonsTypeDataModel ChoiceButtonsType { get; set; }

        // Properties specific to both DropDown and ChoiceButtons
        public ICollection<OptionDataModel> Options { get; set; }

        // Properties specific to Slider
        public int SliderMin { get; set; }
        public int SliderMax { get; set; }

        // Properties specific to TextInput
        public string TextInputType { get; set; }
        public string TextInputMax { get; set; }
        public string TextInputMin { get; set; }
        public string Placeholder { get; set; }
        public string ValidationRegex { get; set; }

        // Properties specific to DateInput
        public DateTime MinDate { get; set; }
        public DateTime MaxDate { get; set; }

        // Properties specific to FileOutput
        public string FileOutputType { get; set; }
        public string FileOutputExtension { get; set; }
        public string FilePath { get; set; }

        // Properties specific to LinkOutput
        public string DisplayName { get; set; }
        [DataType(DataType.Url)]
        public string Url { get; set; }

        // Properties specific to TextOutput
        [DataType(DataType.Text)]
        public string Value { get; set; }
    }
}
