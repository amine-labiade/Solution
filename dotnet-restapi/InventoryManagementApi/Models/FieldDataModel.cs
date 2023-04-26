using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace InventoryManagementApi.Models
{
    /// <summary>
    ///  Inventory field class
    /// </summary>

    [Table("inv_field")]
    public class FieldDataModel
    {
        public Guid Id { get; set; }
        public string Label { get; set; }
        public int Position { get; set; }

        public FieldCategory Category { get; set; }

        [ForeignKey("Data_Source_Id")]
        public virtual DataSourceDataModel DataSource { get; set; }

        [ForeignKey("Field_Data_Id")]
        public virtual FieldDataDataModel FieldData { get; set; }

        //Order matters here, it serves as a mapper front to back end and vice versa
        public enum FieldCategory
        {
            DropdownInput,
            FileInput,
            SliderInput,
            RadioButtons,
            Checkboxes,
            TextInput,
            DateInput,
            TextOutput,
            FileOutput,
            LinkOutput,
        }
    }
}
